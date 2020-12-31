import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { RoomMsg } from "../../../shared/messages/room.message";
import { ClientUserData, UserData } from "../../../shared/models/user.model";

interface Props {
	url: string;
	roomId?: string;
	userData: UserData;
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
	roomId,
	userData,
	children,
}) => {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		const socket = io(url);
		setSocket(socket);

		return () => {
			socket.emit(RoomMsg.leave, roomId);
		};
	}, []);

	useEffect(() => {
		if (!roomId || !socket) return;
		const msg: ClientUserData = {
			...userData,
			roomId: roomId,
		};

		console.log("Going to room");
		socket.emit(RoomMsg.join, msg);
	}, [userData, socket, roomId]);

	return (
		<SocketContext.Provider value={{ socket, setSocket }}>
			{socket && children}
		</SocketContext.Provider>
	);
};
