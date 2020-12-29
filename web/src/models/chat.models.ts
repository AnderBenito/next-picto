export interface ChatMsg {
	username: string;
	text: string;
}

export interface ClientChatMsg extends ChatMsg {
	isMine: boolean;
}
