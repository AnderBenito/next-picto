import React, { useContext } from "react";
import BoardContainer from "../BoardContainer";
import Game from "../../../styles/Game.module.css";
import GameEditorContainer from "../GameEditorContainer";
import { GameManagerContext } from "../../context/GameManagerProvider";

const GameContainer: React.FC = () => {
	const { started } = useContext(GameManagerContext);
	return (
		<div className={Game.container}>
			{started ? <BoardContainer /> : <GameEditorContainer />}
		</div>
	);
};

export default GameContainer;
