import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import DrawingBoardContainer from "../src/containers/DrawingBoardContainer";
import { SocketContext } from "../src/context/SocketProvider";
import Game from "../styles/Game.module.css";

const Example: React.FC = () => {
	const { joinRoom, leaveRoom, deleteGame } = useContext(SocketContext);
	const { query } = useRouter();

	useEffect(() => {
		if (!query.roomId) return;
		joinRoom(query.roomId as string);

		return () => {
			leaveRoom(query.roomId as string);
			deleteGame(query.roomId as string);
		};
	}, [query]);

	return (
		<div className={Game.container}>
			<DrawingBoardContainer />
		</div>
	);
};

export default Example;
