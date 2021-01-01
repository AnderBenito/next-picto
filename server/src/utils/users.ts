import { ServerUserData } from "./../../../shared/models/user.model";
const users: ServerUserData[] = [];

export const joinUser = (user: ServerUserData) => {
	if (!users.find((u) => u.socketId === user.socketId)) {
		users.push(user);
		console.log("Total users: ", users);
	}
};

export const leaveUser = (roomId: string) => {
	const index = users.findIndex((u) => u.roomId === roomId);
	if (index === -1) return;
	users.splice(index, 1);
	console.log(users);
};

export const removeUser = (socketId: string) => {
	const index = users.findIndex((u) => u.socketId === socketId);
	if (index === -1) return;
	users.splice(index, 1);
	console.log(users);
};

export const getUserById = (userId: string) => {
	const user = users.find((u) => u.socketId === userId);

	if (!user) throw new Error("User not found");

	return user;
};
