import React, {
	useCallback,
	useContext,
	useEffect,
	useRef,
	useState,
} from "react";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";
import { DrawMsg } from "../../models/draw.models";

interface Props {
	onMouseUp: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
	onMouseDown: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
	onMouseMove: (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => void;
}

const Canvas: React.FC<Props> = ({ onMouseUp, onMouseDown, onMouseMove }) => {
	const sketchRef = useRef<HTMLCanvasElement>();
	const parentRef = useRef<HTMLDivElement>(null);

	const { canvasContext } = useContext(DrawingBoardContext);

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

	return (
		<div ref={parentRef} style={{ height: "100%", width: "100%" }}>
			<canvas
				ref={sketchRef}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
				style={{ backgroundColor: "#bbb" }}
			/>
		</div>
	);
};

export default Canvas;
