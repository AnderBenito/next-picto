export interface GameData {
	roomId: string;
	host: string;
	users: string[];
	currentTurn: number;
	totalTurns: number;
	started: boolean;
	finished: boolean;
}
