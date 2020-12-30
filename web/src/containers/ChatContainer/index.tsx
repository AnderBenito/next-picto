import React, { useContext, useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import ChatForm from "../../components/ChatForm";
import { SocketContext } from "../../context/SocketProvider";
import {
	ChatData,
	ClientChatData,
} from "../../../../shared/models/chat.models";
import styles from "./index.module.css";

const ChatContainer: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<ClientChatData[]>([]);

	useEffect(() => {
		socket.on("message", (msg: ChatData) => {
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
		const msg: ChatData = {
			username: "Ander",
			text: message,
		};
		socket.emit("message", msg);
		setMessageQueue((prev) => [...prev, { ...msg, isMine: true }]);
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
