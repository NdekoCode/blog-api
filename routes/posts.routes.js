import { Router } from "express";
import PostsCTRL from "../controllers/PostsCTRL.js";
const postsRouter = Router();
const posts = new PostsCTRL();
postsRouter.get("/", posts.getPosts);
export default postsRouter;
