import { Socket } from "socket.io";
import { GameMsg } from "../../../../shared/messages/game.message";
import { ClientUserData } from "../../../../shared/models/user.model";
import {
	createGame,
	deleteGame,
	joinGame,
	leaveGame,
	startGame,
} from "../games";

export default (socket: Socket) => {
	socket.on(GameMsg.create, (userData: ClientUserData) => {
		console.log(userData);
		const games = createGame(userData.roomId, userData.userId);
		console.log("Game created", games);
	});

	socket.on(GameMsg.delete, (userData: ClientUserData) => {
		const games = deleteGame(userData.roomId, userData.userId);
		console.log("Game deleted", games);
	});

	socket.on(GameMsg.join, (userData: ClientUserData) => {
		console.log(userData);
		const games = joinGame(userData.roomId, userData.userId);
		console.log("Game joined", games);
	});

	socket.on(GameMsg.leave, (userData: ClientUserData) => {
		const games = leaveGame(userData.roomId, userData.userId);
		console.log("Game leaved", games);
	});

	socket.on(GameMsg.start, (userData: ClientUserData) => {
		const game = startGame(userData.roomId, userData.userId);
		console.log("Game started", game);
		socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
	});
};
