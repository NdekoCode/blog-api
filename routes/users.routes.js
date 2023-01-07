import { Router } from "express";
import UsersCTRL from "../controllers/UsersCTRL.js";
import { auth } from "../middlewares/auth.mid.js";
const usersRoutes = Router();
const users = new UsersCTRL();
usersRoutes.post("/users/add", users.signin);
usersRoutes.post("/login", users.login);
usersRoutes.get("/users", auth, users.getUsers);
usersRoutes.get("/users/:id", auth, users.getUser);
usersRoutes.put("/users/update/:id", auth, users.updateUser);
usersRoutes.delete("/users/delete/:id", auth, users.deleteUser);
export default usersRoutes;
