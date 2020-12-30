import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";
import { ChatMsg } from "../../shared/messages/chat.messages";
import { DrawMsg } from "../../shared/messages/draw.messages";
import { DrawData } from "../../shared/models/draw.models";
import { ChatData } from "./../../shared/models/chat.models";

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
		socket.on(ChatMsg.message, (msg: ChatData) => {
			console.log(msg);
			socket.broadcast.emit("message", msg);
		});

		socket.on(DrawMsg.draw, (msg: DrawData) => {
			console.log(msg);
			socket.broadcast.emit(DrawMsg.draw, msg);
		});

		socket.on(DrawMsg.draw_start, (msg: DrawData) => {
			console.log("startdraw", msg);
			socket.broadcast.emit(DrawMsg.draw_start, msg);
		});

		socket.on(DrawMsg.draw_finish, () => {
			console.log("finishdraw");
			socket.broadcast.emit(DrawMsg.draw_finish);
		});

		socket.on(DrawMsg.canvas_clear, () => {
			console.log("clear_canvas");
			socket.broadcast.emit(DrawMsg.canvas_clear);
		});

		socket.on("disconnect", (socket: Socket) => {
			console.log("Closed connection with ", socket.id);
		});
	});

	const PORT = 5000 || process.env.PORT;

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

main();
