import getRandomWord from "../utils/getRandomWord";
import { ClientUserData } from "../../../shared/models/user.model";
import { GameData } from "./../../../shared/models/game.model";

export default class GameService {
	private static games: GameData[] = [];

	private static doGameExists(roomId: string) {
		return this.games.findIndex((game) => game.roomId === roomId) !== -1;
	}

	static getAllGames() {
		return new Promise<GameData[]>((resolve, reject) => {
			if (!this.games) {
				reject(new Error("No games found"));
				return;
			}
			resolve(this.games);
		});
	}

	static createGame({ roomId, userId }: ClientUserData, totalTurns = 5) {
		const newGameData: GameData = {
			roomId,
			host: userId,
			users: [],
			turnOf: "",
			turnIndex: 0,
			currentTurn: 0,
			totalTurns,
			started: false,
			finished: false,
			guessWord: "",
		};

		return new Promise<GameData>((resolve, reject) => {
			if (this.doGameExists(roomId)) {
				reject(new Error(`Game with roomId: ${roomId} is already created`));
				return;
			}

			this.games.push(newGameData);

			resolve(newGameData);
		});
	}

	static joinGame({ roomId, userId }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);

			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			if (this.games[index].users.includes(userId)) {
				reject(new Error(`User with id ${userId} is already in game`));
				return;
			}

			this.games[index].users.push(userId);
			resolve(this.games[index]);
		});
	}

	static leaveGame({ roomId, userId }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);
			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			const userIndex = this.games[index].users.findIndex(
				(user) => user === userId
			);
			if (userIndex === -1) {
				reject(new Error(`User with id ${userId} not found in game`));
				return;
			}

			this.games[index].users.splice(userIndex, 1);
			resolve(this.games[index]);
		});
	}

	static deleteGame({ roomId, userId, username }: ClientUserData) {
		return new Promise<GameData[]>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);
			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			if (this.games[index].host !== userId) {
				reject(new Error(`User ${username} is not HOST`));
				return;
			}

			const game = this.games.splice(index, 1);
			resolve(game);
		});
	}

	static startGame({ roomId, userId, username }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);
			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			if (this.games[index].host !== userId) {
				reject(new Error(`User ${username} is not HOST`));
				return;
			}

			//Start game and select user turn
			const game = this.games[index];
			game.guessWord = getRandomWord();
			game.started = true;
			game.turnOf = game.users[game.turnIndex];

			resolve(game);
		});
	}

	static finishTurn({ roomId }: ClientUserData) {
		return new Promise<GameData>((resolve, reject) => {
			const index = this.games.findIndex((game) => game.roomId === roomId);
			if (index === -1) {
				reject(new Error(`Game with roomId: ${roomId} not found`));
				return;
			}

			const game = this.games[index];
			this.increaseTurn(game);

			resolve(game);
		});
	}

	private static increaseTurn(game: GameData) {
		if (game.turnIndex >= game.users.length - 1) {
			game.turnIndex = 0;
			if (game.currentTurn >= game.totalTurns) {
				game.finished = true;
			} else {
				game.currentTurn++;
			}
		} else {
			game.turnIndex++;
		}
		game.guessWord = getRandomWord();

		game.turnOf = game.users[game.turnIndex];
	}
}
