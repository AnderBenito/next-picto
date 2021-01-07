import React, { useContext } from "react";
import { GameManagerContext } from "../../context/GameManagerProvider";
import ChatContainer from "../ChatContainer";
import styles from "../../../styles/GameEditor.module.css";

const GameEditorContainer: React.FC = () => {
	const { startGame } = useContext(GameManagerContext);

	return (
		<div className={styles["container"]}>
			<button className={styles["main-button"]} onClick={startGame}>
				Start Game
			</button>
			<div className={styles["chat-container"]}>
				<ChatContainer />
			</div>
			<p>Users</p>
		</div>
	);
};

export default GameEditorContainer;
