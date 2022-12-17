import { Router } from "express";
import UsersCTRL from "../controllers/UsersCTRL.js";
const usersRoutes = Router();
const users = new UsersCTRL();
usersRoutes.get("/users", users.getUsers);
usersRoutes.get("/users/:id", users.getUser);
usersRoutes.put("users/update/:id", users.updateUser);
export default usersRoutes;
