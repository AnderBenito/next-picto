import React, { useContext, useEffect, useState } from "react";
import { GameManagerContext } from "../context/GameManagerProvider";
import Game from "../components/Organisms/Game";
import { SocketContext } from "../context/SocketProvider";
import { GameMsg } from "../../../shared/messages/game.message";

const GameContainer: React.FC = () => {
	const { roomId, joinGame, leaveGame, socket } = useContext(SocketContext);
	const { gameData, setGameData } = useContext(GameManagerContext);
	const [error, setError] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		socket.on(GameMsg.start, (msg) => {
			console.log("Game data", msg);
			setGameData(msg);
		});

		socket.on(GameMsg.join, (msg) => {
			if (msg.error) {
				setError(msg.error);
			} else {
				console.log("Game joined succesfully, game data =>", msg);
				setGameData(msg);
			}
			setLoading(false);
		});

		socket.on(GameMsg.finishTurn, (msg) => {
			if (msg.error) {
				setError(msg.error);
			} else {
				console.log("Turn finished, new game data =>", msg);
				setGameData(msg);
			}
		});

		return () => {
			socket.off(GameMsg.join);
			socket.off(GameMsg.start);
		};
	}, []);

	useEffect(() => {
		if (!roomId) return;
		joinGame();

		return () => {
			leaveGame();
		};
	}, [roomId]);

	if (error) return <p>Error: {error}</p>;
	else if (loading) return <p>Loading...</p>;
	return <Game isStarted={gameData.started} />;
};

export default GameContainer;
