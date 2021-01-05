import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserProvider";
import { v4 } from "uuid";
import Home from "../../components/Home";
import { SocketContext } from "../../context/SocketProvider";

const HomeContainer: React.FC = () => {
	const { user, setUser, saveUserData } = useContext(UserContext);
	const { createGame, setRoomId } = useContext(SocketContext);
	const router = useRouter();

	const onPlay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		const roomId = v4();
		saveUserData();
		createGame(roomId);
		console.log("Game created");
		router.push(`/${roomId}`);
	};

	const handleUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
		setUser({
			...user,
			username: event.target.value,
		});
	};

	return <Home onPlay={onPlay} user={user} handleUsername={handleUsername} />;
};

export default HomeContainer;
