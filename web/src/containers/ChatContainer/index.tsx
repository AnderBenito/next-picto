import React, { useContext, useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import ChatForm from "../../components/ChatForm";
import { SocketContext } from "../../context/SocketProvider";
import { ChatData, ClientChatData } from "../../../../shared/models/chat.model";
import styles from "./index.module.css";
import { UserContext } from "../../context/UserProvider";

const ChatContainer: React.FC = () => {
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
		<div className={styles["container"]}>
			<ChatList messageQueue={messageQueue} />
			<ChatForm onChange={onChange} onSubmit={onSubmit} value={message} />
		</div>
	);
};

export default ChatContainer;
