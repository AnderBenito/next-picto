import React, { useContext } from "react";
import GameEditor from "../components/Organisms/GameEditor";
import { GameManagerContext } from "../context/GameManagerProvider";

const GameEditorContainer: React.FC = () => {
	const { onStartGame } = useContext(GameManagerContext);

	return <GameEditor onStartGame={onStartGame} />;
};

export default GameEditorContainer;
