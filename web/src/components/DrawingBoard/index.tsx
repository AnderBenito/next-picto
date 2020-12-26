import React, { useEffect, useRef, useState } from "react";

const DrawingBoard: React.FC = () => {
	const sketchRef = useRef<HTMLCanvasElement>();
	const ctxRef = useRef<CanvasRenderingContext2D>();
	const [isDrawing, setIsDrawing] = useState<boolean>(false);

	const startDrawing = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		const { offsetX, offsetY } = e.nativeEvent;
		ctxRef.current.beginPath();
		ctxRef.current.moveTo(offsetX, offsetY);
		setIsDrawing(true);
	};

	const finishDrawing = () => {
		ctxRef.current.closePath();
		setIsDrawing(false);
	};

	const draw = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		ctxRef.current.lineTo(offsetX, offsetY);
		ctxRef.current.stroke();
	};

	useEffect(() => {
		const canvas = sketchRef.current;
		ctxRef.current = canvas.getContext("2d");
	}, []);

	return (
		<div>
			Drawing Board
			<canvas
				ref={sketchRef}
				onMouseUp={finishDrawing}
				onMouseDown={startDrawing}
				onMouseMove={draw}
				width="500"
				height="500"
				style={{ backgroundColor: "#bbb" }}
			/>
		</div>
	);
};

export default DrawingBoard;
