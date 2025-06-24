import {Router} from "express";
import { validateLogin } from "../middlewares/validateLogin.js";
import StatController from "../controllers/StatController.js";
import { validatePositiveNumber } from "../middlewares/middlewares.js";

const statController = new StatController()

const statRoutes = Router();


statRoutes.use(validateLogin);
statRoutes.use(validatePositiveNumber);

statRoutes.put("/updateNormalRecord/:userId", statController.updateRecordNormal);
statRoutes.put("/updateTimedRecord/:userId", statController.updateRecordTimer);
statRoutes.put("/updateTotalGuesses/:userId", statController.updateTotalGuesses);


export default statRoutes;  