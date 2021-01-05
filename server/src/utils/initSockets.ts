import { Server, Socket } from "socket.io";
import { removeUser } from "./users";
import initRoom from "./sockets/initRoom";
import initGame from "./sockets/initGame";
import initDraw from "./sockets/initDraw";
import initChat from "./sockets/initChat";

export default (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);

		initRoom(socket);
		initGame(socket);
		initChat(socket);
		initDraw(socket);

		socket.on("disconnect", () => {
			console.log("Closed connection with ", socket.id);
			removeUser(socket.id);
		});
	});
};
