import { Socket } from "socket.io";
import { ChatMsg } from "../../../../shared/messages/chat.message";
import { ChatData } from "../../../../shared/models/chat.model";
import { getUserById } from "../users";

export default (socket: Socket) => {
	socket.on(ChatMsg.message, (msg: ChatData) => {
		const user = getUserById(socket.id);
		const newMsg = {
			...msg,
			username: user.username,
		};
		socket.broadcast.to(user.roomId).emit(ChatMsg.message, newMsg);
	});
};
