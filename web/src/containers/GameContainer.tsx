import React, { useContext } from "react";
import { GameManagerContext } from "../context/GameManagerProvider";
import Game from "../components/Organisms/Game";

const GameContainer: React.FC = () => {
	const { isStarted } = useContext(GameManagerContext);

	return <Game isStarted={isStarted} />;
};

export default GameContainer;
