import { Server, Socket } from "socket.io";
import draw from "./draw";
import chat from "./chat";
import game from "./game";
import UserService from "../services/UserService";
import GameService from "../services/GameService";

export default (io: Server) => {
	io.on("connection", (socket: Socket) => {
		console.log("New WS connection", socket.id);

		draw(socket);
		chat(socket);
		game(socket);

		socket.on("disconnect", () => {
			console.log("Closed connection with ", socket.id);
			UserService.removeUserBySocketId(socket.id)
				.then((user) => {
					console.log("Removing user", user);
					GameService.leaveGame({
						roomId: user.roomId,
						userId: user.userId,
						username: user.username,
					});
				})
				.catch((error) => console.error(error));
		});
	});
};
