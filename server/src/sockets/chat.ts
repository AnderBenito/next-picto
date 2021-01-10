import { Socket } from "socket.io";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { ClientChatData } from "../../../shared/models/chat.model";
import { SocketData } from "../../../shared/models/socket.model";

export default (socket: Socket) => {
	socket.on(ChatMsg.message, (msg: SocketData<ClientChatData>) => {
		socket.broadcast.to(msg.userData.roomId).emit(ChatMsg.message, msg);
	});
};
