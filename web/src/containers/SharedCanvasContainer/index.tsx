import React, { useContext, useEffect } from "react";
import Canvas from "../../components/Canvas";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";
import { SocketContext } from "../../context/SocketProvider";
import { DrawMsg } from "../../../../shared/messages/draw.message";
const SharedCanvasContainer: React.FC = () => {
	const {
		draw,
		startDrawing,
		finishDrawing,
		isDrawing,
		setIsDrawing,
		drawSettings,
	} = useContext(DrawingBoardContext);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on(DrawMsg.draw, draw);
		socket.on(DrawMsg.draw_start, startDrawing);
		socket.on(DrawMsg.draw_finish, finishDrawing);
	}, []);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		draw({ x: offsetX, y: offsetY });
		socket.emit(DrawMsg.draw, {
			x: offsetX,
			y: offsetY,
		});
	};

	const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		setIsDrawing(true);
		startDrawing({ x: offsetX, y: offsetY });
		socket.emit(DrawMsg.draw_start, {
			x: offsetX,
			y: offsetY,
			color: drawSettings.color,
			width: drawSettings.width,
		});
	};

	const onMouseUp = () => {
		setIsDrawing(false);
		finishDrawing();
		socket.emit(DrawMsg.draw_finish);
	};

	return (
		<Canvas
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
		/>
	);
};

export default SharedCanvasContainer;
