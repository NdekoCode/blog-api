import { Router } from "express";
import UsersCTRL from "../controllers/UsersCTRL.js";
const usersRoutes = Router();
const users = new UsersCTRL();
usersRoutes.get("/users", users.getUsers);
usersRoutes.get("/users/:id", users.getUser);
usersRoutes.post("/users/add", users.signin);
usersRoutes.post("/login", users.login);
usersRoutes.put("/users/update/:id", users.updateUser);
usersRoutes.delete("/users/delete/:id", users.deleteUser);
export default usersRoutes;
