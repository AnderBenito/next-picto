import React from "react";
import { ClientChatData } from "../../../../shared/models/chat.model";
import ChatMessage from "../ChatMessage";
import styles from "./index.module.css";

interface Props {
	messageQueue: ClientChatData[];
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
