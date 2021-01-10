import React, { createContext, useContext, useEffect, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import { GameData } from "../../../shared/models/game.model";
import { SocketContext } from "./SocketProvider";

interface IGameManagerContext {
	gameData: GameData;
	setGameData: React.Dispatch<React.SetStateAction<GameData>>;
	onStartGame: () => void;
}

export const GameManagerContext = createContext<IGameManagerContext>(
	{} as IGameManagerContext
);

export const GameManagerProvider: React.FC = ({ children }) => {
	const [gameData, setGameData] = useState<GameData>();
	const { startGame } = useContext(SocketContext);

	const onStartGame = () => {
		startGame();
	};

	return (
		<GameManagerContext.Provider value={{ gameData, setGameData, onStartGame }}>
			{children}
		</GameManagerContext.Provider>
	);
};
