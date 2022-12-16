import dotenv from "dotenv";
import express from "express";
import { resolve } from "path";
import { __dirname } from "./utils/utils.js";
dotenv.config();
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(resolve(__dirname, "public")));
app.get("/", (req, res) => {
  return res.send({ messages: ["God plan"] });
});

export default app;
