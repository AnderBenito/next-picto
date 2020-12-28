import React from "react";
import { DrawingBoardProvider } from "../../context/DrawingBoardProvider";
import { SocketProvider } from "../../context/SocketProvider";
import SharedCanvasContainer from "../SharedCanvasContainer";
import SharedBoardControlContainer from "../SharedBoardControlContainer";
import ChatContainer from "../ChatContainer";

const DrawingBoardContainer: React.FC = () => {
	return (
		<SocketProvider url="http://localhost:5000">
			<DrawingBoardProvider>
				<SharedCanvasContainer />
				<SharedBoardControlContainer />
			</DrawingBoardProvider>
			<ChatContainer />
		</SocketProvider>
	);
};

export default DrawingBoardContainer;
