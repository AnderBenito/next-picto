import { ClientUserData } from "../../../shared/models/user.model";
import { GameData } from "./../../../shared/models/game.model";

export default class GameService {
	private static games: GameData[] = [];

	static getAllGames() {
		return new Promise((resolve, reject) => {
			if (!this.games) {
				reject(new Error("No games found"));
				return;
			}
			resolve(this.games);
		});
	}

	static createGame({ roomId, userId }: ClientUserData, totalTurns = 0) {
		const newGameData: GameData = {
			roomId,
			host: userId,
			users: [],
			currentTurn: 0,
			totalTurns,
			started: false,
			finished: false,
		};

		return new Promise((resolve, reject) => {
			if (this.games.findIndex((game) => game.roomId === roomId) !== -1) {
				reject(new Error(`Game with roomId: ${roomId} is already created`));
				return;
			}

			this.games.push(newGameData);

			resolve(newGameData);
		});
	}

	static joinGame({ roomId, userId }: ClientUserData) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return this.games;
		if (this.games[index].users.includes(userId)) return this.games;

		this.games[index].users.push(userId);

		return this.games;
	}

	static leaveGame({ roomId, userId }: ClientUserData) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return this.games;
		const userIndex = this.games[index].users.findIndex(
			(user) => user === userId
		);
		if (userIndex === -1) return this.games;
		this.games[index].users.splice(userIndex, 1);

		return this.games;
	}

	static deleteGame({ roomId, userId }: ClientUserData) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return;
		if (this.games[index].host !== userId) return;
		this.games.splice(index, 1);

		return this.games;
	}

	static startGame({ roomId, userId }: ClientUserData) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return;
		if (this.games[index].host !== userId) return;
		this.games[index].started = true;

		return this.games[index];
	}
}
