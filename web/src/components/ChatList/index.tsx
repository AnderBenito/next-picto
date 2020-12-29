import React from "react";
import { ChatMsg, ClientChatMsg } from "../../models/chat.models";
import ChatMessage from "../ChatMessage";
import styles from "./index.module.css";

interface Props {
	messageQueue: ClientChatMsg[];
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
