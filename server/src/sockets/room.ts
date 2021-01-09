import { Socket } from "socket.io";
import UserService from "../services/UserService";
import { ChatMsg } from "../../../shared/messages/chat.message";
import {
	ClientUserData,
	ServerUserData,
} from "../../../shared/models/user.model";
import { RoomMsg } from "../../../shared/messages/room.message";

export default (socket: Socket) => {
	socket.on(RoomMsg.join, (userData: ClientUserData) => {
		let newUserData: ServerUserData = { ...userData, socketId: socket.id };
		if (userData && userData.roomId) {
			socket.emit(ChatMsg.message, {
				text: `Welcome to room ${userData.roomId}`,
				isMine: false,
				username: "Next Picto",
			});
			socket.broadcast.emit(ChatMsg.message, {
				text: `${userData.username} has joined the room`,
				isMine: false,
				username: "Next Picto",
			});

			const users = UserService.joinUser(newUserData);
			socket.join(newUserData.roomId);
			console.log("user joined", users);
		}
	});

	socket.on(RoomMsg.leave, (roomId: string) => {
		const users = UserService.leaveUser(roomId);
		socket.leave(roomId);
		console.log("Leaved user", users);
	});
};
