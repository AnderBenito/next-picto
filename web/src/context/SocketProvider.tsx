import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RoomMsg } from "../../../shared/messages/room.message";
import { UserData } from "../../../shared/models/user.model";

interface Props {
	url: string;
	userData?: UserData;
}

interface ISocketContext {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

export const SocketProvider: React.FC<Props> = ({
	url,
	userData,
	children,
}) => {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		const socket = io(url);
		if (userData) {
			console.log("Going to room");
			socket.emit(RoomMsg.join, userData);
		}

		setSocket(socket);
	}, []);
	return (
		<SocketContext.Provider value={{ socket, setSocket }}>
			{socket && children}
		</SocketContext.Provider>
	);
};
