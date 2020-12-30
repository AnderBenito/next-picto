import React, { createContext, useEffect, useRef, useState } from "react";
import { DrawData } from "../../../shared/models/draw.model";

interface IDrawingContext {
	isDrawing: boolean;
	setIsDrawing: React.Dispatch<React.SetStateAction<boolean>>;
	canvasContext: React.MutableRefObject<CanvasRenderingContext2D>;
	drawSettings: {
		color: string;
		width: number;
	};
	setDrawSettings: React.Dispatch<
		React.SetStateAction<{
			color: string;
			width: number;
		}>
	>;
	startDrawing: (msg: DrawData) => any;
	finishDrawing: () => any;
	draw: (msg: DrawData) => any;
	clearCanvas: () => void;
}

export const DrawingBoardContext = createContext<IDrawingContext>(
	{} as IDrawingContext
);

export const DrawingBoardProvider: React.FC = (props) => {
	const canvasContext = useRef<CanvasRenderingContext2D>();
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [drawSettings, setDrawSettings] = useState({
		color: "#000",
		width: 5,
	});

	const clearCanvas = () => {
		canvasContext.current.clearRect(
			0,
			0,
			window.innerWidth,
			window.innerHeight
		);
	};

	const startDrawing = (msg: DrawData) => {
		if (!canvasContext.current) return;
		const { x, y, color, width } = msg;
		canvasContext.current.strokeStyle = color || drawSettings.color;
		canvasContext.current.lineWidth = width || drawSettings.width;
		canvasContext.current.lineCap = "round";
		canvasContext.current.lineJoin = "round";
		canvasContext.current.beginPath();
		canvasContext.current.moveTo(x, y);
	};

	const finishDrawing = () => {
		if (!canvasContext.current) return;
		canvasContext.current.closePath();
	};

	const draw = (coordinates: DrawData) => {
		if (!canvasContext.current) return;
		const { x, y } = coordinates;
		canvasContext.current.lineTo(x, y);
		canvasContext.current.stroke();
	};

	return (
		<DrawingBoardContext.Provider
			value={{
				isDrawing,
				setIsDrawing,
				canvasContext,
				drawSettings,
				setDrawSettings,
				draw,
				finishDrawing,
				startDrawing,
				clearCanvas,
			}}
		>
			{props.children}
		</DrawingBoardContext.Provider>
	);
};
