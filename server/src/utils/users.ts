import { UserData } from "./../../../shared/models/user.model";
const users: UserData[] = [];

export const joinUser = (user: UserData) => {
	if (!users.find((u) => u.userId === user.userId)) {
		users.push(user);
		console.log(users);
	}
};

export const getUserById = (userId: string) => {
	const user = users.find((u) => u.userId === userId);

	if (!user) throw new Error("User not found");

	return user;
};
