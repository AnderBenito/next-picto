import React, { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

const DrawingBoard: React.FC = () => {
	const sketchRef = useRef<HTMLCanvasElement>();
	const socket = useRef<Socket>();
	const ctxRef = useRef<CanvasRenderingContext2D>();
	const [isDrawing, setIsDrawing] = useState<boolean>(false);

	const startDrawing = (msg: any) => {
		const { offsetX, offsetY } = msg;
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		ctxRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = (coordinates: any) => {
		const { offsetX, offsetY } = coordinates;
		ctxRef.current.lineTo(offsetX, offsetY);
		ctxRef.current.stroke();
	};

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		socket.current.emit("draw", { offsetX, offsetY });
		draw({ offsetX, offsetY });
	};

	const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		socket.current.emit("startdraw", { offsetX, offsetY });

		startDrawing(e.nativeEvent);
	};

	const onMouseUp = () => {
		socket.current.emit("finishdraw");
		finishDrawing();
	};

	useEffect(() => {
		const canvas = sketchRef.current;
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

		ctxRef.current = canvas.getContext("2d");
	}, []);

	return (
		<canvas
			ref={sketchRef}
			onMouseUp={onMouseUp}
			onMouseDown={onMouseDown}
			onMouseMove={onMouseMove}
			width="500"
			height="500"
			style={{ backgroundColor: "#bbb" }}
		/>
	);
};

export default DrawingBoard;
