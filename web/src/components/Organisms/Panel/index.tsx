import React, { useContext } from "react";
import ChatContainer from "../../../containers/ChatContainer";
import TimerContainer from "../../../containers/TimerContainer";
import { GameManagerContext } from "../../../context/GameManagerProvider";
import Board from "../Board";
import styles from "./index.module.css";

const Panel: React.FC = () => {
	return (
		<div className={styles["container"]}>
			<Board />
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
		</div>
	);
};

export default Panel;
