import React, { useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "../../context/UserProvider";

const HomeContainer: React.FC = () => {
	const { user, setUser } = useContext(UserContext);
	const router = useRouter();

	const onPlay = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		setUser({
			...user,
			roomId: "someRoomId",
		});
		router.push("/play");
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
			<button onClick={onPlay}>Play</button>
		</div>
	);
};

export default HomeContainer;
