import { Socket } from "socket.io";
import { DrawMsg } from "../../../../shared/messages/draw.message";
import { DrawData } from "../../../../shared/models/draw.model";
import { getUserById } from "../users";

export default (socket: Socket) => {
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
};
