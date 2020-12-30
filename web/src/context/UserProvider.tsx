import React, { createContext, useState } from "react";
import { UserData } from "../../../shared/models/user.model";

interface IUserContext {
	user: UserData;
	setUser: React.Dispatch<React.SetStateAction<UserData>>;
}

export const UserContext = createContext<IUserContext>({} as IUserContext);

export const UserProvider: React.FC = ({ children }) => {
	const [user, setUser] = useState<UserData>({
		userId: "",
		username: "",
		roomId: "",
	});
	return (
		<UserContext.Provider value={{ user, setUser }}>
			{children}
		</UserContext.Provider>
	);
};
