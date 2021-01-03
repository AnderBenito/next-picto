import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import DrawingBoardContainer from "../src/containers/DrawingBoardContainer";
import { SocketContext } from "../src/context/SocketProvider";
import Game from "../styles/Game.module.css";

const Example: React.FC = () => {
	const { joinRoom, leaveRoom, deleteGame } = useContext(SocketContext);
	const { query } = useRouter();

	useEffect(() => {
		const roomId = query.roomId as string;
		if (!roomId) return;
		joinRoom(roomId);

		return () => {
			leaveRoom(roomId);
			deleteGame(roomId);
		};
	}, [query]);

	return (
		<div className={Game.container}>
			<DrawingBoardContainer />
		</div>
	);
};

export default Example;
