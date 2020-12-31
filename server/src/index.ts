import express from "express";
import http from "http";
import { Server } from "socket.io";
import initSockets from "./utils/initSockets";

const main = async () => {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: {
			origin: "http://localhost:3000",
		},
	});

	initSockets(io);

	const PORT = 5000 || process.env.PORT;

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

main();
