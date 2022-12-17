import dotenv from "dotenv";
import express from "express";
import { resolve } from "path";
import postsRouter from "./routes/posts.routes.js";
import usersRoutes from "./routes/users.routes.js";
import { __dirname } from "./utils/utils.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, "public")));
const baseUrl = process.env.BASE_URL;
app.get("/", (req, res) => {
  return res.send({ messages: ["God plan"] });
});

app.use(baseUrl + "/auth", usersRoutes);
app.use(baseUrl + "/posts", postsRouter);
export default app;
