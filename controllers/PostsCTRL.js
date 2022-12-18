import PostMDL from "../models/PostMDL.js";
import TagMDL from "../models/TagMDL.js";
import Alert from "../utils/Alert.js";
import Validator from "../utils/Validator.js";
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
      const posts = await PostMDL.find().populate([
        "author",
        {
          path: "tags",
          model: TagMDL,
        },
      ]);
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
  async getPost(req, res) {
    const validator = new Validator();
    const _id = req.params.id;
    try {
      const post = await PostMDL.findById(_id).populate([
        "author",
        { path: "tags", model: TagMDL },
      ]);
      if (!validator.isEmpty(post)) {
        return res.json(post);
      }
      return res.json({});
    } catch (error) {
      const alert = new Alert(req, res);
      return alert.danger(error.message, 500);
    }
  }
}
