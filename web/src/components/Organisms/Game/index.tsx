import React from "react";
import GameEditorContainer from "../../../containers/GameEditorContainer";
import Panel from "../Panel";
import styles from "./index.module.css";

interface Props {
	isStarted: boolean;
}

const Game: React.FC<Props> = ({ isStarted }) => {
	return (
		<div className={styles["container"]}>
			{isStarted ? <Panel /> : <GameEditorContainer />}
		</div>
	);
};

export default Game;
