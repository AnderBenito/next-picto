import { useRouter } from "next/router";
import React, { useContext, useEffect } from "react";
import DrawingBoardContainer from "../src/containers/DrawingBoardContainer";
import { SocketContext } from "../src/context/SocketProvider";

const Example: React.FC = () => {
	const { joinRoom, leaveRoom } = useContext(SocketContext);
	const { query } = useRouter();

	useEffect(() => {
		if (!query.roomId) return;
		joinRoom(query.roomId as string);

		return () => {
			leaveRoom(query.roomId as string);
		};
	}, [query]);

	return <DrawingBoardContainer />;
};

export default Example;
