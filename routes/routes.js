import {Router} from "express";
import userRoutes from "./userRoutes.js";
import statRoutes from "./statRoutes.js";
import {logger} from "../middlewares/middlewares.js";
import optionRoutes from "./OptionRoutes.js";

const routes = Router();


routes.use("/user", logger, userRoutes);
routes.use("/stat", statRoutes);
routes.use("/options", optionRoutes)


export default routes;