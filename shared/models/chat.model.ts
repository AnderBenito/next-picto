export interface ChatData {
	text: string;
}

export interface ClientChatData extends ChatData {
	username: string;
	isMine: boolean;
}
