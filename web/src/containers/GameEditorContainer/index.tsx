import React, { useContext } from "react";
import { GameManagerContext } from "../../context/GameManagerProvider";

const GameEditorContainer: React.FC = () => {
	const { startGame } = useContext(GameManagerContext);

	return (
		<div>
			<button onClick={startGame}>Start Game</button>
		</div>
	);
};

export default GameEditorContainer;
