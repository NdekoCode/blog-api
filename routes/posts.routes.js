import { Router } from "express";
import PostsCTRL from "../controllers/PostsCTRL.js";
const postsRouter = Router();
const posts = new PostsCTRL();
postsRouter.get("/", posts.getPosts);
postsRouter.get("/:id", posts.getPost);
postsRouter.post("/add", posts.addPost);
export default postsRouter;
