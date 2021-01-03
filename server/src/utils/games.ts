import { GameData } from "../../../shared/models/game.model";
const games: GameData[] = [];

export const createGame = (
	roomId: string,
	socketId: string,
	totalTurns = 0,
	finished = false
) => {
	const newGameData: GameData = {
		roomId,
		host: socketId,
		users: [socketId],
		currentTurn: 0,
		totalTurns,
		finished,
	};
	games.push(newGameData);

	return games;
};

export const deleteGame = (roomId: string, socketId: string) => {
	const index = games.findIndex((game) => game.roomId === roomId);
	if (index === -1) return;
	if (games[index].host !== socketId) return;
	games.splice(index, 1);

	return games;
};
