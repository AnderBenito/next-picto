import React from "react";
import { DrawingBoardProvider } from "../../context/DrawingBoardProvider";
import SharedCanvasContainer from "../SharedCanvasContainer";
import SharedBoardControlContainer from "../SharedBoardControlContainer";
import ChatContainer from "../ChatContainer";
import styles from "./index.module.css";

interface Props {}

const BoardContainer: React.FC<Props> = () => {
	return (
		<div className={styles["container"]}>
			<DrawingBoardProvider>
				<div className={styles["board-container"]}>
					<SharedCanvasContainer />
					<SharedBoardControlContainer />
				</div>
			</DrawingBoardProvider>
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
		</div>
	);
};

export default BoardContainer;
