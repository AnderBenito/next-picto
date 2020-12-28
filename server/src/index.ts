import express from "express";
import http from "http";
import { Server, Socket } from "socket.io";

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
		socket.on("message", (msg: any) => {
			console.log(msg);
			socket.broadcast.emit("message", msg);
		});
		socket.on("draw", (msg: any) => {
			console.log(msg);
			socket.broadcast.emit("draw", msg);
		});
		socket.on("startdraw", (msg: any) => {
			console.log("startdraw", msg);
			socket.broadcast.emit("startdraw", msg);
		});
		socket.on("finishdraw", (msg: any) => {
			console.log("finishdraw", msg);
			socket.broadcast.emit("finishdraw", msg);
		});
		socket.on("clear_canvas", (msg: any) => {
			console.log("clear_canvas", msg);
			socket.broadcast.emit("clear_canvas", msg);
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
