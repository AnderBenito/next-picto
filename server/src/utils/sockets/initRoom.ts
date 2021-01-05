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
