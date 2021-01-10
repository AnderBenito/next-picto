import { Socket } from "socket.io";
import { GameMsg } from "../../../shared/messages/game.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { SocketData } from "../../../shared/models/socket.model";
import { ClientChatData } from "../../../shared/models/chat.model";
import GameService from "../services/GameService";
import UserService from "../services/UserService";

export default (socket: Socket) => {
	socket.on(GameMsg.join, (userData: ClientUserData) => {
		GameService.joinGame(userData)
			.then((game) => {
				console.log("Game joined", game);
				socket.join(userData.roomId);
				socket.emit(GameMsg.join, game);

				UserService.saveUser({
					...userData,
					socketId: socket.id,
				}).then((user) => console.log("USER REGISTERED", user));

				const msg: SocketData<ClientChatData> = {
					userData: {
						roomId: userData.roomId,
						userId: "bootId",
						username: "Next Picto",
					},
					msgData: {
						isMine: false,
						text: `Welcome to room ${userData.roomId}`,
					},
				};
				socket.emit(ChatMsg.message, msg);
			})
			.catch((error) => {
				socket.emit(GameMsg.join, { error: error.message });
			});
	});

	socket.on(GameMsg.leave, (userData: ClientUserData) => {
		GameService.leaveGame(userData)
			.then((game) => {
				console.log("LEAVING GAME", game);
				socket.emit(GameMsg.leave, game);
				socket.leave(userData.roomId);

				UserService.removeUserBySocketId(socket.id);
			})
			.catch((error) => {
				socket.emit(GameMsg.leave, { error: error.message });
			});
	});

	socket.on(GameMsg.start, (userData: ClientUserData) => {
		const game = GameService.startGame(userData);
		console.log("Game started", game);
		socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
	});

	return socket;
};
