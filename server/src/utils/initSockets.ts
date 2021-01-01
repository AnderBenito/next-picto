import {
	ClientUserData,
	ServerUserData,
} from "./../../../shared/models/user.model";
import { Server, Socket } from "socket.io";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { DrawMsg } from "../../../shared/messages/draw.message";
import { RoomMsg } from "../../../shared/messages/room.message";
import { ChatData } from "../../../shared/models/chat.model";
import { DrawData } from "../../../shared/models/draw.model";
import { joinUser, getUserById, leaveUser, removeUser } from "./users";

export default (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);

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

		socket.on(ChatMsg.message, (msg: ChatData) => {
			const user = getUserById(socket.id);
			const newMsg = {
				...msg,
				username: user.username,
			};
			socket.broadcast.to(user.roomId).emit(ChatMsg.message, newMsg);
		});

		socket.on(DrawMsg.draw, (msg: DrawData) => {
			const user = getUserById(socket.id);

			socket.broadcast.to(user.roomId).emit(DrawMsg.draw, msg);
		});

		socket.on(DrawMsg.draw_start, (msg: DrawData) => {
			const user = getUserById(socket.id);
			console.log("startdraw", msg);
			socket.broadcast.to(user.roomId).emit(DrawMsg.draw_start, msg);
		});

		socket.on(DrawMsg.draw_finish, () => {
			const user = getUserById(socket.id);
			console.log("finishdraw");
			socket.broadcast.to(user.roomId).emit(DrawMsg.draw_finish);
		});

		socket.on(DrawMsg.canvas_clear, () => {
			const user = getUserById(socket.id);
			console.log("clear_canvas");
			socket.broadcast.to(user.roomId).emit(DrawMsg.canvas_clear);
		});

		socket.on("disconnect", () => {
			console.log("Closed connection with ", socket.id);
			removeUser(socket.id);
		});
	});
};
