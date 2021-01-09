import React, { createContext, useContext, useEffect, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import { GameData } from "../../../shared/models/game.model";
import { SocketContext } from "./SocketProvider";

interface IGameManagerContext {
	isStarted: boolean;
	onStartGame: () => void;
}

export const GameManagerContext = createContext<IGameManagerContext>(
	{} as IGameManagerContext
);

export const GameManagerProvider: React.FC = ({ children }) => {
	const [isStarted, setIsStarted] = useState<boolean>(false);
	const { socket, startGame } = useContext(SocketContext);

	useEffect(() => {
		socket.on(GameMsg.start, (msg: GameData) => {
			console.log("Game data", msg);
		});
	}, []);

	const onStartGame = () => {
		setIsStarted(true);
	};

	return (
		<GameManagerContext.Provider value={{ isStarted, onStartGame }}>
			{children}
		</GameManagerContext.Provider>
	);
};
