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
	});

	const PORT = 5000 || process.env.PORT;

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

main();
