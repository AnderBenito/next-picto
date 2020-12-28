import React, { useContext } from "react";
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
		socket.emit("clear_canvas");
	};

	return (
		<BoardControl
			drawSettings={drawSettings}
			setDrawSettings={setDrawSettings}
			onCanvasClear={onCanvasClear}
		/>
	);
};

export default SharedBoardControlContainer;
