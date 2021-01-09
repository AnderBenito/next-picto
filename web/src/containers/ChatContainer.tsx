import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../context/SocketProvider";
import { ClientChatData } from "../../../shared/models/chat.model";
import { UserContext } from "../context/UserProvider";
import Chat from "../components/Organisms/Chat";
import { ChatMsg } from "../../../shared/messages/chat.message";

const ChatContainer: React.FC<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
	const { user } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<ClientChatData[]>([]);

	useEffect(() => {
		socket.on(ChatMsg.message, (msg: any) => {
			console.log("Message received", msg);
			const newMsg: ClientChatData = {
				...msg,
				isMine: false,
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
		const msg: ClientChatData = {
			text: message,
			username: user.username,
			isMine: true,
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
