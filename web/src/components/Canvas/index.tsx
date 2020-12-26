import React from "react";

const Canvas: React.FC<
	React.DetailedHTMLProps<
		React.CanvasHTMLAttributes<HTMLCanvasElement>,
		HTMLCanvasElement
	>
> = ({ ...props }) => {
	return <canvas {...props}></canvas>;
};

export default Canvas;
