import { ClientUserData } from "./user.model";

export interface GameData {
	roomId: string;
	host: string;
	users: ClientUserData[];
	turnOf: string;
	turnIndex: number;
	currentTurn: number;
	totalTurns: number;
	started: boolean;
	finished: boolean;
	guessWord?: string;
}

export interface TimerData {
	timerValue: number;
}
