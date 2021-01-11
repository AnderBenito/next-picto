import React, { useContext } from "react";
import TimerContainer from "../../../containers/TimerContainer";
import { GameManagerContext } from "../../../context/GameManagerProvider";
import Panel from "../Panel";
import styles from "./index.module.css";

const Game = () => {
	const { isMyTurn } = useContext(GameManagerContext);
	return (
		<div className={styles["container"]}>
			<TimerContainer />
			<Panel />
			{!isMyTurn() && <div>IM DISABLED</div>}
		</div>
	);
};

export default Game;
