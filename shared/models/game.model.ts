export interface GameData {
	roomId: string;
	host: string;
	users: string[];
	turnOf: string;
	turnIndex: number;
	currentTurn: number;
	totalTurns: number;
	started: boolean;
	finished: boolean;
}
