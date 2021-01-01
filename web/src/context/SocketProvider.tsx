import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RoomMsg } from "../../../shared/messages/room.message";
import { ClientUserData } from "../../../shared/models/user.model";
import { UserContext } from "./UserProvider";

interface Props {
	url: string;
}

interface ISocketContext {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
	joinRoom: (roomId: string) => void;
	leaveRoom: (roomId: string) => void;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

export const SocketProvider: React.FC<Props> = ({ url, children }) => {
	const [socket, setSocket] = useState<Socket>();
	const { user } = useContext(UserContext);

	const joinRoom = (roomId: string) => {
		const msg: ClientUserData = {
			roomId,
			username: user.username,
		};
		socket.emit(RoomMsg.join, msg);
	};

	const leaveRoom = (roomId: string) => {
		socket.emit(RoomMsg.leave, roomId);
	};

	useEffect(() => {
		const socket = io(url);
		setSocket(socket);

		return () => {
			socket.close();
		};
	}, []);

	return (
		<SocketContext.Provider value={{ socket, setSocket, joinRoom, leaveRoom }}>
			{socket && children}
		</SocketContext.Provider>
	);
};
