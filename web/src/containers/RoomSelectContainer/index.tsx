import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserProvider";
import { nanoid } from "nanoid";
import { SocketContext } from "../../context/SocketProvider";
import RoomSelect from "../../components/RoomSelect";

const RoomSelectContainer: React.FC = () => {
	const [joinedRoomId, setJoinedRoomId] = useState<string>("");
	const { user, setUser, saveUserData } = useContext(UserContext);
	const { createGame } = useContext(SocketContext);
	const router = useRouter();

	const onCreate = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const roomId = nanoid(8);
		saveUserData();
		createGame(roomId);
		console.log("Game created");
		router.push(`/${roomId}`);
	};

	const onJoin = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		saveUserData();
		router.push(`/${joinedRoomId}`);
	};

	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			username: event.target.value,
		});
	};

	const handleJoinedRoomId = (event: React.ChangeEvent<HTMLInputElement>) => {
		setJoinedRoomId(event.target.value);
	};

	return (
		<RoomSelect
			onCreate={onCreate}
			onJoin={onJoin}
			user={user}
			joinedRoomId={joinedRoomId}
			handleUsername={handleUsername}
			handleJoinedRoomId={handleJoinedRoomId}
		/>
	);
};

export default RoomSelectContainer;
