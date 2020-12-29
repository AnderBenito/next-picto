import React from "react";
import { DrawingBoardProvider } from "../../context/DrawingBoardProvider";
import { SocketProvider } from "../../context/SocketProvider";
import SharedCanvasContainer from "../SharedCanvasContainer";
import SharedBoardControlContainer from "../SharedBoardControlContainer";
import ChatContainer from "../ChatContainer";
import styles from "./index.module.css";

const DrawingBoardContainer: React.FC = () => {
	return (
		<SocketProvider url="http://localhost:5000">
			<div className={styles["container"]}>
				<DrawingBoardProvider>
					<div className={styles["board-container"]}>
						<SharedBoardControlContainer />
						<SharedCanvasContainer />
					</div>
				</DrawingBoardProvider>
				<ChatContainer />
			</div>
		</SocketProvider>
	);
};

export default DrawingBoardContainer;
