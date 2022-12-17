import PostMDL from "../models/PostMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty } from "../utils/validators.js";

export default class PostsCTRL {
  async getPosts(req, res) {
    try {
      /* const posts = await PostMDL.find().populate("autthor", [
        "email",
        "firstName",
        "lastName",
        "username",
        "image",
      ]); */
      const posts = await PostMDL.find().populate("author");
      if (!isEmpty(posts)) {
        return res.json({ posts });
      }

      return res.json({ posts: [] });
    } catch (error) {
      console.log(error);
      const alert = new Alert(req, res);
      return alert.danger(error.message, 500);
    }
  }
}
