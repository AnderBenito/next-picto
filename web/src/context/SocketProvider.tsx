import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { GameMsg } from "../../../shared/messages/game.message";
import { RoomMsg } from "../../../shared/messages/room.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { UserContext } from "./UserProvider";

interface Props {
	url: string;
}

interface ISocketContext {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
	roomId: string;
	setRoomId: React.Dispatch<React.SetStateAction<string>>;
	joinRoom: () => void;
	leaveRoom: () => void;
	createGame: (roomId: string) => void;
	deleteGame: (roomId: string) => void;
	joinGame: () => void;
	leaveGame: () => void;
	startGame: () => void;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

export const SocketProvider: React.FC<Props> = ({ url, children }) => {
	const [socket, setSocket] = useState<Socket>();
	const [roomId, setRoomId] = useState<string>("");
	const { user } = useContext(UserContext);

	useEffect(() => {
		const socket = io(url);
		setSocket(socket);

		return () => {
			socket.close();
		};
	}, []);

	useEffect(() => {
		if (!roomId) return;
		console.log("Joining to room with id", roomId);
		joinRoom();
		joinGame();

		return () => {
			leaveGame();
			leaveRoom();
		};
	}, [roomId]);

	const createMessage = (roomId: string) => {
		const msg: ClientUserData = {
			...user,
			roomId,
		};

		return msg;
	};

	const joinRoom = () => {
		socket.emit(RoomMsg.join, createMessage(roomId));
	};

	const leaveRoom = () => {
		socket.emit(RoomMsg.leave, roomId);
	};

	const createGame = (roomId: string) => {
		socket.emit(GameMsg.create, createMessage(roomId));
	};

	const joinGame = () => {
		socket.emit(GameMsg.join, createMessage(roomId));
	};

	const leaveGame = () => {
		socket.emit(GameMsg.leave, createMessage(roomId));
	};

	const deleteGame = (roomId: string) => {
		socket.emit(GameMsg.delete, createMessage(roomId));
	};

	const startGame = () => {
		socket.emit(GameMsg.start, createMessage(roomId));
	};

	return (
		<SocketContext.Provider
			value={{
				socket,
				setSocket,
				roomId,
				setRoomId,
				joinRoom,
				leaveRoom,
				createGame,
				deleteGame,
				joinGame,
				leaveGame,
				startGame,
			}}
		>
			{socket && children}
		</SocketContext.Provider>
	);
};
