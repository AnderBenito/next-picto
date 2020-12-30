import React, { useContext, useEffect, useRef } from "react";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";
import styles from "./index.module.css";

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
		<div ref={parentRef} className={styles["container"]}>
			<canvas
				ref={sketchRef}
				onMouseUp={onMouseUp}
				onMouseDown={onMouseDown}
				onMouseMove={onMouseMove}
			/>
		</div>
	);
};

export default Canvas;
