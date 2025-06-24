import {Router} from "express";
import UserControllers from "../controllers/UserControllers.js";
import { validateLogin } from "../middlewares/validateLogin.js";

const userController = new UserControllers();

const userRoutes = Router();

userRoutes.post("/login", userController.login);
userRoutes.post("/", userController.createUser);

userRoutes.use(validateLogin);

userRoutes.get("/profile", userController.profile);
userRoutes.get("/profile/:id", userController.profileForID);
userRoutes.get('/leaderboard', userController.getLeaderboardUsers)
userRoutes.get('/leaderboardTimer', userController.getLeaderboardUsersTimer)
userRoutes.get("/", userController.getAllUsers);
userRoutes.get("/:id", userController.getUserById);
userRoutes.put("/:id", userController.updateUser);
userRoutes.delete("/:id", userController.deleteUser);



export default userRoutes;  