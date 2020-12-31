export interface UserData {
	username: string;
}

export interface ClientUserData extends UserData {
	roomId: string;
}

export interface ServerUserData extends ClientUserData {
	socketId: string;
}
