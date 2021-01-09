import { ClientUserData } from "./../../../shared/models/user.model";
import { Router } from "express";
import GameService from "../services/GameService";

const router = Router();

router.get("/", (_, res) => {
	GameService.getAllGames()
		.then((games) => res.status(200).send(games))
		.catch((error) => res.status(400).send(error.message));
});

router.post("/create", (req, res) => {
	const userData: ClientUserData = req.body.userData;

	GameService.createGame(userData.roomId, userData.userId)
		.then((game) => {
			console.log(game);
			res.status(200).send(game);
		})
		.catch((error) => {
			console.error(error.message);
			res.status(400).send(error.message);
		});
});

export default router;
