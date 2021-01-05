import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import GameContainer from "../src/containers/GameContainer";
import { GameManagerProvider } from "../src/context/GameManagerProvider";
import { SocketContext } from "../src/context/SocketProvider";

const Example: React.FC = () => {
	const { setRoomId } = useContext(SocketContext);
	const { query } = useRouter();

	useEffect(() => {
		const roomId = query.roomId as string;
		if (!roomId) return;
		setRoomId(roomId);

		return () => {
			setRoomId("");
		};
	}, [query]);

	return (
		<GameManagerProvider>
			<GameContainer />
		</GameManagerProvider>
	);
};

export default Example;
