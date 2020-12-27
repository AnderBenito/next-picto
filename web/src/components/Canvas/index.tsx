import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";

interface Props {}

const Canvas: React.FC<Props> = () => {
	const sketchRef = useRef<HTMLCanvasElement>();
	const parentRef = useRef<HTMLDivElement>(null);

	const {
		canvasContext,
		isDrawing,
		draw,
		startDrawing,
		finishDrawing,
		setIsDrawing,
	} = useContext(DrawingBoardContext);

	useEffect(() => {
		const canvas = sketchRef.current;
		const ctx = canvas.getContext("2d");

		canvasContext.current = ctx;
	}, []);

	useEffect(() => {
		console.log("parent changed");
		if (parentRef.current) {
			sketchRef.current.height = parentRef.current.clientHeight;
			sketchRef.current.width = parentRef.current.clientWidth;
		}
	}, [parentRef]);

	const onMouseMove = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		if (!isDrawing) return;
		const { offsetX, offsetY } = e.nativeEvent;
		draw({ offsetX, offsetY });
	};

	const onMouseDown = (e: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
		setIsDrawing(true);
		startDrawing(e.nativeEvent);
	};

	const onMouseUp = () => {
		setIsDrawing(false);
		finishDrawing();
	};

	return (
		<div ref={parentRef} style={{ height: "600px" }}>
			<canvas
				ref={sketchRef}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				style={{ backgroundColor: "#bbb" }}
			/>

			<button onClick={() => console.log(parentRef.current.clientWidth)}>
				CLick
			</button>
		</div>
	);
};

export default Canvas;
