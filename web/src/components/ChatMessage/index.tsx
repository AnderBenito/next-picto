import React from "react";
import { ClientChatMsg } from "../../models/chat.models";
import styles from "./index.module.css";

interface Props {
	message: ClientChatMsg;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
	return (
		<li
			className={`${styles["message"]}
				${message.isMine ? styles["my-message"] : styles["other-message"]}`}
		>
			<strong>{message.username}:</strong>
			{message.text}
		</li>
	);
};

export default ChatMessage;
