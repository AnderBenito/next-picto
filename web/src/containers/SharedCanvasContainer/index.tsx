import React, { useContext, useEffect } from "react";
import Canvas from "../../components/Canvas";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";
import { SocketContext } from "../../context/SocketProvider";
import { DrawMsg } from "../../models/draw.models";

const SharedCanvasContainer: React.FC = () => {
	const {
		draw,
		startDrawing,
		finishDrawing,
		isDrawing,
		setIsDrawing,
		drawSettings,
		clearCanvas,
	} = useContext(DrawingBoardContext);
	const { socket } = useContext(SocketContext);

	useEffect(() => {
		socket.on("draw", (msg: DrawMsg) => {
			draw(msg);
		});

		socket.on("startdraw", (msg: DrawMsg) => {
			startDrawing(msg);
		});

		socket.on("finishdraw", finishDrawing);

		socket.on("clear_canvas", clearCanvas);

		return () => socket.close();
	}, []);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		draw({ x: offsetX, y: offsetY });
		socket.emit("draw", {
			x: offsetX,
			y: offsetY,
		});
	};

	const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		setIsDrawing(true);
		startDrawing({ x: offsetX, y: offsetY });
		socket.emit("startdraw", {
			x: offsetX,
			y: offsetY,
			color: drawSettings.color,
			width: drawSettings.width,
		});
	};

	const onMouseUp = () => {
		setIsDrawing(false);
		finishDrawing();
		socket.emit("finishdraw");
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
