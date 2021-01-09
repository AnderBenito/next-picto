import React, { useContext, useEffect, useState } from "react";
import ChatList from "../components/Molecules/ChatList";
import ChatForm from "../components/Molecules/ChatForm";
import { SocketContext } from "../context/SocketProvider";
import { ClientChatData } from "../../../shared/models/chat.model";
import { UserContext } from "../context/UserProvider";
import Chat from "../components/Organisms/Chat";

const ChatContainer: React.FC<
	React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>
> = () => {
	const { user } = useContext(UserContext);
	const { socket } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<ClientChatData[]>([]);

	useEffect(() => {
		socket.on("message", (msg: any) => {
			console.log("Message received", msg);
			const newMsg: ClientChatData = {
				...msg,
				isMine: false,
			};
			setMessageQueue((prev) => [...prev, newMsg]);
		});
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
		socket.emit("message", msg);
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
