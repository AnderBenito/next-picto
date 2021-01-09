import React from "react";
import ChatContainer from "../../../containers/ChatContainer";
import styles from "./index.module.css";

interface Props {
	onStartGame: any;
}

const GameEditor: React.FC<Props> = ({ onStartGame }) => {
	return (
		<div className={styles["container"]}>
			<button className={styles["main-button"]} onClick={onStartGame}>
				Start Game
			</button>
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
			<p>Users</p>
		</div>
	);
};

export default GameEditor;
