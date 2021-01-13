import React, { useContext, useEffect, useRef, useState } from "react";
import { GameMsg } from "../../../shared/messages/game.message";
import Timer from "../components/Atoms/Timer";
import { GameManagerContext } from "../context/GameManagerProvider";
import { SocketContext } from "../context/SocketProvider";

const TIMEOUT_TOTAL = 10;

const TimerContainer: React.FC = () => {
	const { gameData, isMyTurn } = useContext(GameManagerContext);
	const { socket, createMessage, roomId } = useContext(SocketContext);

	const [timer, setTimer] = useState<number>(TIMEOUT_TOTAL);
	const intervalId = useRef<NodeJS.Timeout>();

	const countDown = () => {
		if (timer <= 0) {
			console.log("TIME OUT");
			clearInterval(intervalId.current);
			setTimer(TIMEOUT_TOTAL);
			socket.emit(GameMsg.finishTurn, createMessage(roomId));
		}
	};

	useEffect(() => {
		if (!gameData || !isMyTurn()) return;

		intervalId.current = setInterval(
			() => setTimer((timer) => timer - 1),
			1000
		);

		return () => {
			clearInterval(intervalId.current);
		};
	}, [gameData]);

	useEffect(() => {
		countDown();
	}, [timer]);

	return <Timer timer={timer} />;
};

export default TimerContainer;
