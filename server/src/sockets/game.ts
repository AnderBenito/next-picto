import { Socket } from "socket.io";
import GameService from "../services/GameService";
import { GameMsg } from "../../../shared/messages/game.message";
import { ClientUserData } from "../../../shared/models/user.model";

export default (socket: Socket) => {
	socket.on(GameMsg.create, (userData: ClientUserData) => {
		console.log(userData);
		const games = GameService.createGame(userData);
		console.log("Game created", games);
	});

	socket.on(GameMsg.delete, (userData: ClientUserData) => {
		const games = GameService.deleteGame(userData);
		console.log("Game deleted", games);
	});

	socket.on(GameMsg.join, (userData: ClientUserData) => {
		console.log(userData);
		const games = GameService.joinGame(userData);
		console.log("Game joined", games);
	});

	socket.on(GameMsg.leave, (userData: ClientUserData) => {
		const games = GameService.leaveGame(userData);
		console.log("Game leaved", games);
	});

	socket.on(GameMsg.start, (userData: ClientUserData) => {
		const game = GameService.startGame(userData);
		console.log("Game started", game);
		socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
	});
};
