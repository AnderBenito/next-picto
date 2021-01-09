import React from "react";
import { ClientChatData } from "../../../../../shared/models/chat.model";
import styles from "./index.module.css";

interface Props {
	message: ClientChatData;
}
const ChatMessage: React.FC<Props> = ({ message }) => {
	return (
		<li
			className={`${styles["message"]}
				${message.isMine ? styles["my-message"] : styles["other-message"]}`}
		>
			<div>
				<strong>{message.username}:</strong>
				<p>{message.text}</p>
			</div>
		</li>
	);
};

export default ChatMessage;
