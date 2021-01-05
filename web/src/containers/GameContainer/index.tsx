import React, { useContext } from "react";
import DrawingBoardContainer from "../DrawingBoardContainer";
import Game from "../../../styles/Game.module.css";
import GameEditorContainer from "../GameEditorContainer";
import { GameManagerContext } from "../../context/GameManagerProvider";

const GameContainer: React.FC = () => {
	const { started } = useContext(GameManagerContext);
	return (
		<div className={Game.container}>
			{started ? <DrawingBoardContainer /> : <GameEditorContainer />}
		</div>
	);
};

export default GameContainer;
