import { GameData } from "./../../../shared/models/game.model";

export default class GameService {
	private static games: GameData[] = [];

	static createGame(roomId: string, userId: string, totalTurns = 0) {
		const newGameData: GameData = {
			roomId,
			host: userId,
			users: [],
			currentTurn: 0,
			totalTurns,
			started: false,
			finished: false,
		};
		this.games.push(newGameData);

		return this.games;
	}

	static joinGame(roomId: string, userId: string) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return this.games;
		if (this.games[index].users.includes(userId)) return this.games;

		this.games[index].users.push(userId);

		return this.games;
	}

	static leaveGame(roomId: string, userId: string) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return this.games;
		const userIndex = this.games[index].users.findIndex(
			(user) => user === userId
		);
		if (userIndex === -1) return this.games;
		this.games[index].users.splice(userIndex, 1);

		return this.games;
	}

	static deleteGame(roomId: string, userId: string) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return;
		if (this.games[index].host !== userId) return;
		this.games.splice(index, 1);

		return this.games;
	}

	static startGame(roomId: string, userId: string) {
		const index = this.games.findIndex((game) => game.roomId === roomId);
		if (index === -1) return;
		if (this.games[index].host !== userId) return;
		this.games[index].started = true;

		return this.games[index];
	}
}
