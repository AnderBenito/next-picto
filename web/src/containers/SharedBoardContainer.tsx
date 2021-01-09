import React, { useContext, useEffect } from "react";
import { DrawMsg } from "../../../shared/messages/draw.message";
import BoardControl from "../components/Molecules/BoardControl";
import { BoardContext } from "../context/BoardProvider";
import { SocketContext } from "../context/SocketProvider";

const SharedBoardControlContainer: React.FC = () => {
	const { clearCanvas, setDrawSettings, drawSettings } = useContext(
		BoardContext
	);
	const { socket } = useContext(SocketContext);

	const onCanvasClear = () => {
		clearCanvas();
		socket.emit(DrawMsg.canvas_clear);
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
