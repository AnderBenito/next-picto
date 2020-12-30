import React, { useContext, useEffect } from "react";
import { DrawMsg } from "../../../../shared/messages/draw.messages";
import BoardControl from "../../components/BoardControl";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";
import { SocketContext } from "../../context/SocketProvider";

const SharedBoardControlContainer: React.FC = () => {
	const { clearCanvas, setDrawSettings, drawSettings } = useContext(
		DrawingBoardContext
	);
	const { socket } = useContext(SocketContext);

	const onCanvasClear = () => {
		clearCanvas();
		socket.emit(DrawMsg.canvas_clear);
	};

	useEffect(() => {
		socket.on(DrawMsg.canvas_clear, clearCanvas);
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
