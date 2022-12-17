import { hash } from "bcrypt";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import slugify from "slugify";
import PostMDL from "../models/PostMDL.js";
import TagMDL from "../models/TagMDL.js";
import UserMDL from "../models/UserMDL.js";
import { __filename } from "./utils.js";
export async function fakeUser() {
  const userFile = await readFile(__filename + "/fakeDataJSON/users.json", {
    encoding: "utf-8",
  });
  const userFileData = JSON.parse(userFile);
  for (const item of userFileData) {
    const password = await hash("7288ndeko", 12);
    const userData = {
      slug: slugify(`${item.firstName} ${item.lastName}`.toLocaleLowerCase()),
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
export async function fakePosts() {
  const postsFile = await readFile(join(__filename, "fakeData", "posts.json"));
  const postData = JSON.parse(postsFile);
  const users = UserMDL.find();
  for (let post of postData) {
    const postItem = {};
    const post = new PostMDL(post);
  }
}
export async function fakeTags() {
  const singleFile = await readFile(
    join(__filename, "fakeDataJSON", "tags.json")
  );
  const singleTags = JSON.parse(singleFile);
  for (let item of singleTags) {
    item.slug = slugify(item.title.toLowerCase());
    const tag = new TagMDL(item);
    await tag.save();
    console.log("tag ", item.title, " Ajouter");
  }
}
