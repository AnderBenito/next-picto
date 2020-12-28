import React, { createContext, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";

interface Props {
	url: string;
}

interface ISocketContext {
	socket: Socket;
	setSocket: React.Dispatch<React.SetStateAction<Socket>>;
}

export const SocketContext = createContext<ISocketContext>(
	{} as ISocketContext
);

export const SocketProvider: React.FC<Props> = ({ url, children }) => {
	const [socket, setSocket] = useState<Socket>();

	useEffect(() => {
		setSocket(io(url));
	}, []);
	return (
		<SocketContext.Provider value={{ socket, setSocket }}>
			{socket && children}
		</SocketContext.Provider>
	);
};
