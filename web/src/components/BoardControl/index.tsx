import React from "react";

interface Props {
	setDrawSettings: React.Dispatch<
		React.SetStateAction<{
			color: string;
			width: number;
		}>
	>;
	drawSettings: {
		color: string;
		width: number;
	};
	onCanvasClear: () => any;
}

const BoardControl: React.FC<Props> = ({
	drawSettings,
	setDrawSettings,
	onCanvasClear,
}) => {
	return (
		<div>
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
			<button onClick={onCanvasClear}>Clear</button>
		</div>
	);
};

export default BoardControl;
