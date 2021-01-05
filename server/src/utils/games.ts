import { GameData } from "../../../shared/models/game.model";
const games: GameData[] = [];

export const createGame = (roomId: string, userId: string, totalTurns = 0) => {
	const newGameData: GameData = {
		roomId,
		host: userId,
		users: [],
		currentTurn: 0,
		totalTurns,
		started: false,
		finished: false,
	};
	games.push(newGameData);

	return games;
};

export const joinGame = (roomId: string, userId: string) => {
	const index = games.findIndex((game) => game.roomId === roomId);
	if (index === -1) return games;
	if (games[index].users.includes(userId)) return games;

	games[index].users.push(userId);

	return games;
};

export const leaveGame = (roomId: string, userId: string) => {
	const index = games.findIndex((game) => game.roomId === roomId);
	if (index === -1) return games;
	const userIndex = games[index].users.findIndex((user) => user === userId);
	if (userIndex === -1) return games;
	games[index].users.splice(userIndex, 1);

	return games;
};

export const deleteGame = (roomId: string, userId: string) => {
	const index = games.findIndex((game) => game.roomId === roomId);
	if (index === -1) return;
	if (games[index].host !== userId) return;
	games.splice(index, 1);

	return games;
};

export const startGame = (roomId: string, userId: string) => {
	const index = games.findIndex((game) => game.roomId === roomId);
	if (index === -1) return;
	if (games[index].host !== userId) return;
	games[index].started = true;

	return games[index];
};
