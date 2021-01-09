import { Server, Socket } from "socket.io";
import UserService from "../services/UserService";
import room from "./room";
import game from "./game";
import draw from "./draw";
import chat from "./chat";

export default (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);

		room(socket);
		game(socket);
		draw(socket);
		chat(socket);

		socket.on("disconnect", () => {
			console.log("Closed connection with ", socket.id);
			UserService.removeUser(socket.id);
		});
	});
};
