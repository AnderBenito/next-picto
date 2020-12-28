import React, { useContext, useEffect, useState } from "react";
import { SocketContext } from "../../context/SocketProvider";

const ChatContainer: React.FC = () => {
	const { socket } = useContext(SocketContext);
	const [message, setMessage] = useState<string>("");
	const [messageQueue, setMessageQueue] = useState<string[]>([]);

	useEffect(() => {
		socket.on("message", (msg) => {
			console.log("Message received", msg);
			setMessageQueue([...messageQueue, msg.message]);
		});
	}, []);
	return (
		<div>
			Chat
			<ul>
				{messageQueue.map((m, index) => (
					<li key={index}>{m}</li>
				))}
			</ul>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					socket.emit("message", { message });
				}}
			>
				<input
					type="text"
					value={message}
					onChange={(e) => setMessage(e.target.value)}
				/>
			</form>
		</div>
	);
};

export default ChatContainer;
