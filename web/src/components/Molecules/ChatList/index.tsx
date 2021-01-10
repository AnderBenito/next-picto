import React from "react";
import { ClientChatData } from "../../../../../shared/models/chat.model";
import { SocketData } from "../../../../../shared/models/socket.model";
import ChatMessage from "../../Atoms/ChatMessage";
import styles from "./index.module.css";

interface Props {
	messageQueue: SocketData<ClientChatData>[];
}

const ChatList: React.FC<Props> = ({ messageQueue }) => {
	return (
		<ul className={styles["chat-list"]}>
			{messageQueue.map((m, index) => (
				<ChatMessage key={index} message={m} />
			))}
		</ul>
	);
};

export default ChatList;
