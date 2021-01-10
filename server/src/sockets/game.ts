import { Socket } from "socket.io";
import { GameMsg } from "../../../shared/messages/game.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { SocketData } from "../../../shared/models/socket.model";
import { ClientChatData } from "../../../shared/models/chat.model";
import GameService from "../services/GameService";
import UserService from "../services/UserService";

function emitWelcomeMessage(socket: Socket, userData: ClientUserData) {
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

	msg.msgData.text = `${userData.username} has joined the room`;
	socket.broadcast.to(userData.roomId).emit(ChatMsg.message, msg);
}

export default (socket: Socket) => {
	socket.on(GameMsg.join, (userData: ClientUserData) => {
		GameService.joinGame(userData)
			.then((game) => {
				UserService.saveUser({
					...userData,
					socketId: socket.id,
				})
					.then((user) => {
						console.log("Game joined", game);
						console.log("USER REGISTERED", user);
						socket.join(userData.roomId);
						socket.emit(GameMsg.join, game);
						emitWelcomeMessage(socket, userData);
					})
					.catch((error) => {
						console.error(error.message);
						socket.emit(GameMsg.join, { error: error.message });
					});
			})
			.catch((error) => {
				console.error(error.message);
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
		GameService.startGame(userData)
			.then((game) => {
				console.log("Game started");
				socket.emit(GameMsg.start, game);
				socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
			})
			.catch((error) => {
				console.error(error);
				socket.emit(GameMsg.start, { error: error.message });
			});
	});

	socket.on(GameMsg.finishTurn, (userData: ClientUserData) => {
		GameService.finishTurn(userData)
			.then((game) => {
				console.log("Turn finished by", userData.username);
				socket.emit(GameMsg.finishTurn, game);
				socket.broadcast.to(userData.roomId).emit(GameMsg.start, game);
			})
			.catch((error) => {
				console.error(error);
				socket.emit(GameMsg.finishTurn, { error: error.message });
			});
	});

	return socket;
};
