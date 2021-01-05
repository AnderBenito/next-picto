import React, { createContext, useContext, useEffect, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import { GameData } from "../../../shared/models/game.model";
import { SocketContext } from "./SocketProvider";

interface IGameManagerContext {
	started: boolean;
	startGame: () => void;
}

export const GameManagerContext = createContext<IGameManagerContext>(
	{} as IGameManagerContext
);

export const GameManagerProvider: React.FC = ({ children }) => {
	const [started, setStarted] = useState<boolean>(false);
	const { socket, startGame: _startGame } = useContext(SocketContext);

	useEffect(() => {
		socket.on(GameMsg.start, (msg: GameData) => {
			console.log("Game data", msg);
		});
	}, []);

	const startGame = () => {
		setStarted(true);
	};

	return (
		<GameManagerContext.Provider value={{ started, startGame }}>
			{children}
		</GameManagerContext.Provider>
	);
};
