import React, { useState } from "react";
import { UserData } from "../../../../../shared/models/user.model";
import styles from "./index.module.css";

interface Props {
	user: UserData;
	joinedRoomId: string;
	handleUsername: (event: React.ChangeEvent<HTMLInputElement>) => void;
	handleJoinedRoomId: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onCreate: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
	onJoin: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

const RoomSelect: React.FC<Props> = ({
	handleUsername,
	handleJoinedRoomId,
	onCreate,
	onJoin,
	user,
	joinedRoomId,
}) => {
	const [isJoining, setIsJoining] = useState<boolean>(false);

	return (
		<div className={styles["box-container"]}>
			<div className={styles["select-button__container"]}>
				<button
					className={`${!isJoining && styles["active"]}`}
					onClick={() => setIsJoining(false)}
				>
					Create
				</button>
				<button
					className={`${isJoining && styles["active"]}`}
					onClick={() => setIsJoining(true)}
				>
					Join
				</button>
			</div>
			<section>
				<label>Enter username:</label>
				<input
					type="text"
					value={user.username}
					onChange={handleUsername}
				></input>
				{isJoining && (
					<>
						<label>Enter room code:</label>
						<input
							type="text"
							value={joinedRoomId}
							onChange={handleJoinedRoomId}
						></input>
					</>
				)}
				<button
					disabled={!user.username}
					onClick={isJoining ? onJoin : onCreate}
					className={styles["main-button"]}
				>
					{isJoining ? "Join Room" : "Create Room"}
				</button>
			</section>
		</div>
	);
};

export default RoomSelect;
