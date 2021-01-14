import React from "react";
import { ClientUserData } from "../../../../../shared/models/user.model";
import User from "../../Atoms/User";
import styles from "./index.module.css";

interface Props {
	users: ClientUserData[];
}

const UserList: React.FC<Props> = ({ users }) => {
	return (
		<div className={styles.container}>
			{users.map((user) => (
				<User key={user.userId} user={user} />
			))}
		</div>
	);
};

export default UserList;
