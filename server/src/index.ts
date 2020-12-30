import { RoomMsg } from "../../shared/messages/room.message";
import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { ChatMsg } from "../../shared/messages/chat.message";
import { DrawMsg } from "../../shared/messages/draw.message";
import { DrawData } from "../../shared/models/draw.model";
import { ChatData } from "../../shared/models/chat.model";
import { getUserById, joinUser } from "./utils/users";
import { UserData } from "../../shared/models/user.model";

const main = async () => {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});

	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);
		socket.on(RoomMsg.join, (user: UserData) => {
			user.userId = socket.id;
			if (user && user.roomId) {
				joinUser(user);
				socket.join(user.roomId);
				console.log("Joined to room", user.roomId);
			}
		});

		socket.on(RoomMsg.leave, (user: UserData) => {
			socket.leave(user.roomId);
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
		});
	});

	const PORT = 5000 || process.env.PORT;

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

main();
