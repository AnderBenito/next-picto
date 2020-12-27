import Board from "../src/components/Board";
import Canvas from "../src/components/Canvas";
import SharedCanvas from "../src/components/SharedCanvas";
import { DrawingBoardProvider } from "../src/context/DrawingBoardProvider";
import styles from "../styles/Home.module.css";

export default function Home() {
	return (
		<DrawingBoardProvider>
			<Board>
				<SharedCanvas>
					<Canvas />
				</SharedCanvas>
			</Board>
		</DrawingBoardProvider>
	);
}
