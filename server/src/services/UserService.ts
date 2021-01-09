import { ServerUserData } from "./../../../shared/models/user.model";

export default class UserService {
	private static users: ServerUserData[] = [];

	static joinUser(user: ServerUserData) {
		if (!this.users.find((u) => u.socketId === user.socketId)) {
			this.users.push(user);
		}
		return this.users;
	}

	static leaveUser(roomId: string) {
		const index = this.users.findIndex((u) => u.roomId === roomId);
		if (index === -1) return;
		this.users.splice(index, 1);

		return this.users;
	}

	static removeUser(socketId: string) {
		const index = this.users.findIndex((u) => u.socketId === socketId);
		if (index === -1) return;
		this.users.splice(index, 1);

		return this.users;
	}

	static getUserById(userId: string) {
		const user = this.users.find((u) => u.socketId === userId);

		if (!user) throw new Error("User not found");

		return user;
	}
}
