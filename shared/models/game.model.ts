export interface GameData {
	roomId: string;
	host: string;
	users: any[];
	currentTurn: number;
	totalTurns: number;
	finished: boolean;
}
