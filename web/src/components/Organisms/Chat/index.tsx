import React from "react";
import ChatForm from "../../Molecules/ChatForm";
import ChatList from "../../Molecules/ChatList";
import styles from "./index.module.css";

interface Props {
	messageQueue: any[];
	message: string;
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const Chat: React.FC<Props> = ({
	message,
	messageQueue,
	onChange,
	onSubmit,
}) => {
	return (
		<div className={styles["container"]}>
			<ChatList messageQueue={messageQueue} />
			<ChatForm onChange={onChange} onSubmit={onSubmit} value={message} />
		</div>
	);
};

export default Chat;
