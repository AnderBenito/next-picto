import React from "react";
import { ClientChatData } from "../../../../shared/models/chat.models";
import ChatMessage from "../ChatMessage";
import styles from "./index.module.css";

interface Props {
	messageQueue: ClientChatData[];
}

const ChatList: React.FC<Props> = ({ messageQueue }) => {
	return (
		<div className={styles["chat-list"]}>
			<ul>
				{messageQueue.map((m, index) => (
					<ChatMessage key={index} message={m} />
				))}
			</ul>
		</div>
	);
};

export default ChatList;
