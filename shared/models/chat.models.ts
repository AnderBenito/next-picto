export interface ChatData {
	username: string;
	text: string;
}

export interface ClientChatData extends ChatData {
	isMine: boolean;
}
