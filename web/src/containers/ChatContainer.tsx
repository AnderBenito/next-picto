import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ClientChatData } from "../../../shared/models/chat.model";
import Chat from "../components/Organisms/Chat";
import { ChatMsg } from "../../../shared/messages/chat.message";
import { SocketData } from "../../../shared/models/socket.model";

const ChatContainer: React.FC<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
	const { socket, createMessage, roomId } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<
		SocketData<ClientChatData>[]
	>([]);

	useEffect(() => {
		socket.on(ChatMsg.message, (msg: SocketData<ClientChatData>) => {
			console.log("Message received", msg);
			const newMsg: SocketData<ClientChatData> = {
				...msg,
				msgData: {
					...msg.msgData,
					isMine: false,
				},
			};
			setMessageQueue((prev) => [...prev, newMsg]);
		});

		return () => {
			socket.off(ChatMsg.message);
		};
	}, []);

	const onChange = (e: React.ChangeEvent<HTMLInputElement>) =>
		setMessage(e.target.value);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const msg: SocketData<ClientChatData> = {
			userData: createMessage(roomId),
			msgData: {
				isMine: true,
				text: message,
			},
		};
		socket.emit(ChatMsg.message, msg);
		setMessageQueue((prev) => [...prev, msg]);
		setMessage("");
	};

	return (
		<Chat
			messageQueue={messageQueue}
			message={message}
			onChange={onChange}
			onSubmit={onSubmit}
		/>
	);
};

export default ChatContainer;
