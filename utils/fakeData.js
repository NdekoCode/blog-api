import { hash } from "bcrypt";
import { readFile } from "node:fs/promises";
import slugify from "slugify";
import UserMDL from "../models/UserMDL.js";
import { __filename } from "./utils.js";
export async function fakeUser() {
  const userFile = await readFile(__filename + "/fadeData/users.json", {
    encoding: "utf-8",
  });
  const userFileData = JSON.parse(userFile);
  for (const item of userFileData) {
    const password = await hash("7288ndeko", 12);
    const userData = {
      slug: slugify(`${item.firstName} ${item.lastName}`),
      firstName: item.firstName,
      lastName: item.lastName,
      email: item.email,
      username: item.username,
      password,
    };
    const user = new UserMDL(userData);
    await user.save();
    console.log("add user ", `${item.firstName} ${item.lastName}`);
  }
}
