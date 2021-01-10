import React, { useContext, useEffect } from "react";
import { DrawMsg } from "../../../shared/messages/draw.message";
import { DrawData } from "../../../shared/models/draw.model";
import { SocketData } from "../../../shared/models/socket.model";
import BoardControl from "../components/Molecules/BoardControl";
import { BoardContext } from "../context/BoardProvider";
import { SocketContext } from "../context/SocketProvider";

const SharedBoardControlContainer: React.FC = () => {
	const { clearCanvas, setDrawSettings, drawSettings } = useContext(
		BoardContext
	);
	const { socket, createMessage, roomId } = useContext(SocketContext);

	const onCanvasClear = () => {
		clearCanvas();
		const msg: SocketData<DrawData> = {
			userData: createMessage(roomId),
			msgData: { x: 0, y: 0 },
		};
		socket.emit(DrawMsg.canvas_clear, msg);
	};

	useEffect(() => {
		socket.on(DrawMsg.canvas_clear, clearCanvas);

		return () => {
			socket.off(DrawMsg.canvas_clear);
		};
	}, []);

	return (
		<BoardControl
			drawSettings={drawSettings}
			setDrawSettings={setDrawSettings}
			onCanvasClear={onCanvasClear}
		/>
	);
};

export default SharedBoardControlContainer;
