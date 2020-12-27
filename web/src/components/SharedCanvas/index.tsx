import React, { useContext, useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";

const SharedCanvas: React.FC = ({ children }) => {
	const socket = useRef<Socket>();

	const {
		isDrawing,
		draw,
		startDrawing,
		finishDrawing,
		drawSettings,
	} = useContext(DrawingBoardContext);

	useEffect(() => {
		socket.current = io("http://localhost:5000");

		socket.current.on("draw", (msg) => {
			draw(msg);
		});

		socket.current.on("startdraw", (msg) => {
			startDrawing(msg);
		});

		socket.current.on("finishdraw", () => {
			finishDrawing();
		});
	}, []);

	const onMouseDown = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!socket.current) return;
		const { offsetX, offsetY } = e.nativeEvent;
		socket.current.emit("startdraw", {
			offsetX,
			offsetY,
			color: drawSettings.color,
		});
	};

	const onMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		if (!socket.current || !isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		socket.current.emit("draw", {
			offsetX,
			offsetY,
			color: drawSettings.color,
		});
	};

	const onMouseUp = () => {
		if (!socket.current) return;
		socket.current.emit("finishdraw");
	};

	return (
		<div
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			onMouseUp={onMouseUp}
			style={{ backgroundColor: "blue" }}
		>
			{children}
		</div>
	);
};

export default SharedCanvas;
