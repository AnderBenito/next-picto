import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserProvider";
import { v4 } from "uuid";

const HomeContainer: React.FC = () => {
	const { user, setUser, saveUserData } = useContext(UserContext);
	const router = useRouter();

	const onPlay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		saveUserData();
		router.push(`/${v4()}`);
	};

	return (
		<div>
			<label>Enter username</label>
			<input
				type="text"
				value={user.username}
				onChange={(e) =>
					setUser({
						...user,
						username: e.target.value,
					})
				}
			></input>
			<button onClick={onPlay}>Create Room</button>
		</div>
	);
};

export default HomeContainer;
