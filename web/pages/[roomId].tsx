import { useRouter } from "next/router";
import React, { useContext } from "react";
import DrawingBoardContainer from "../src/containers/DrawingBoardContainer";
import { UserContext } from "../src/context/UserProvider";

const Example: React.FC = () => {
	const { user } = useContext(UserContext);
	const router = useRouter();
	const roomId: string = router.query.roomId as string;

	return <DrawingBoardContainer userData={user} roomId={roomId} />;
};

export default Example;
