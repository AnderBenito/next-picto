import React, { useContext, useEffect, useState } from "react";
import { GameManagerContext } from "../context/GameManagerProvider";
import Game from "../components/Organisms/Game";
import { SocketContext } from "../context/SocketProvider";
import { GameMsg } from "../../../shared/messages/game.message";

const GameContainer: React.FC = () => {
	const { roomId, joinGame, leaveGame, socket } = useContext(SocketContext);
	const { isStarted } = useContext(GameManagerContext);
	const [error, setError] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {
		if (!roomId) return;
		joinGame();

		socket.on(GameMsg.join, (msg) => {
			console.log(msg);
			if (msg.error) {
				setError(true);
			}
			setLoading(false);
		});

		return () => {
			leaveGame();
			socket.off(GameMsg.join);
		};
	}, [roomId]);

	if (error) return <p>Error joining game xd</p>;
	else if (loading) return <p>Loading...</p>;
	return <Game isStarted={isStarted} />;
};

export default GameContainer;
