import React from "react";
import { UserData } from "../../../../shared/models/user.model";
import styles from "./index.module.css";

interface Props {
	user: UserData;
	handleUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onPlay: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}
const Home: React.FC<Props> = ({ handleUsername, onPlay, user }) => {
	return (
		<div className={styles["container"]}>
			<h1>Next Picto</h1>
			<div className={styles["box-container"]}>
				<label>Enter username:</label>
				<input
					type="text"
					value={user.username}
					onChange={handleUsername}
				></input>
				<button disabled={!user.username} onClick={onPlay}>
					Create Room
				</button>
			</div>
		</div>
	);
};

export default Home;
