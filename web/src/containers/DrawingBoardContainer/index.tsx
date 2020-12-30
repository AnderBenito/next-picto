import React, { useContext } from "react";
import { DrawingBoardProvider } from "../../context/DrawingBoardProvider";
import { SocketProvider } from "../../context/SocketProvider";
import SharedCanvasContainer from "../SharedCanvasContainer";
import SharedBoardControlContainer from "../SharedBoardControlContainer";
import ChatContainer from "../ChatContainer";
import styles from "./index.module.css";
import { UserContext } from "../../context/UserProvider";

const DrawingBoardContainer: React.FC = () => {
	const { user } = useContext(UserContext);

	return (
		<SocketProvider url="http://localhost:5000" userData={user}>
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
