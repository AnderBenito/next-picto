import React, { createContext, useRef, useState } from "react";

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
	startDrawing: any;
	finishDrawing: any;
	draw: any;
}

export const DrawingBoardContext = createContext<IDrawingContext>(
	{} as IDrawingContext
);

export const DrawingBoardProvider: React.FC = (props) => {
	const [isDrawing, setIsDrawing] = useState<boolean>(false);
	const [drawSettings, setDrawSettings] = useState({
		color: "#000",
		width: 5,
	});
	const canvasContext = useRef<CanvasRenderingContext2D>();

	const startDrawing = (msg: any) => {
		if (!canvasContext.current) return;
		const { offsetX, offsetY, color } = msg;
		canvasContext.current.strokeStyle = color || drawSettings.color;
		canvasContext.current.lineWidth = drawSettings.width;
		canvasContext.current.lineCap = "round";
		canvasContext.current.lineJoin = "round";
		canvasContext.current.beginPath();
		canvasContext.current.moveTo(offsetX, offsetY);
	};

	const finishDrawing = () => {
		if (!canvasContext.current) return;
		canvasContext.current.closePath();
	};

	const draw = (coordinates: any) => {
		if (!canvasContext.current) return;
		const { offsetX, offsetY } = coordinates;
		canvasContext.current.lineTo(offsetX, offsetY);
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
			}}
		>
			{props.children}
		</DrawingBoardContext.Provider>
	);
};
