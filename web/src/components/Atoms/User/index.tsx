import React from "react";
import { ClientUserData } from "../../../../../shared/models/user.model";
import styles from "./index.module.css";

interface Props {
	user: ClientUserData;
}

const User: React.FC<Props> = ({ user }) => {
	return (
		<div className={styles.container}>
			<h4>{user.username}</h4>
			<h5>{user.userId}</h5>
		</div>
	);
};

export default User;
