import React, { useContext, useRef, useState } from "react";
import { DrawingBoardContext } from "../../context/DrawingBoardProvider";

interface Props {
	render?: any;
}

const Board: React.FC<Props> = (props) => {
	const { setDrawSettings, drawSettings, canvasContext } = useContext(
		DrawingBoardContext
	);

	return (
		<div>
			{props.children}
			<input
				type="number"
				onChange={(e) =>
					setDrawSettings({
						...drawSettings,
						width: parseInt(e.target.value),
					})
				}
				value={drawSettings.width}
			/>
			<input
				type="color"
				onChange={(e) =>
					setDrawSettings({
						...drawSettings,
						color: e.target.value,
					})
				}
				value={drawSettings.color}
			/>
			<button onClick={() => console.log(canvasContext)}>Clicki</button>
		</div>
	);
};

export default Board;
