import express from "express";
import http from "http";
import { Server } from "socket.io";
import corsConfig from "./config/corsConfig";
import initSockets from "./sockets/initSockets";

const main = async () => {
	const app = express();
	const server = http.createServer(app);
	const io = new Server(server, {
		cors: corsConfig,
	});

	initSockets(io);

	const PORT = 5000 || process.env.PORT;

	server.listen(PORT, () => {
		console.log(`Server running on port ${PORT}`);
	});
};

main();
