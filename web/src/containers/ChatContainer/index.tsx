import React, { useContext, useEffect, useState } from "react";
import ChatList from "../../components/ChatList";
import ChatForm from "../../components/ChatForm";
import { SocketContext } from "../../context/SocketProvider";
import { ChatMsg, ClientChatMsg } from "../../models/chat.models";
import styles from "./index.module.css";

const ChatContainer: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<ClientChatMsg[]>([]);

	useEffect(() => {
		socket.on("message", (msg: ChatMsg) => {
			console.log("Message received", msg);
			const newMsg: ClientChatMsg = {
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
		const msg: ChatMsg = {
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
