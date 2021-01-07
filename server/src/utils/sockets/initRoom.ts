import { ChatMsg } from "./../../../../shared/messages/chat.message";
import {
	ClientUserData,
	ServerUserData,
} from "./../../../../shared/models/user.model";
import { joinUser, leaveUser } from "./../users";
import { RoomMsg } from "./../../../../shared/messages/room.message";
import { Socket } from "socket.io";

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

			joinUser(newUserData);
			socket.join(newUserData.roomId);
			console.log("user joined");
		}
	});

	socket.on(RoomMsg.leave, (roomId: string) => {
		socket.leave(roomId);
		leaveUser(roomId);
		console.log("Leaved user");
	});
};
