import PostMDL from "../models/PostMDL.js";
import Alert from "../utils/Alert.js";
import { isEmpty } from "../utils/validators.js";

export default class PostsCTRL {
  async getPosts(req, res) {
    try {
      const posts = await PostMDL.find({}).sort({ createdAt: -1 }).exec();
      if (!isEmpty(posts)) {
        return res.json({ posts });
      }

      return res.json({ posts: [] });
    } catch (error) {
      const alert = new Alert(req, res);
      return alert.danger(error.message, 500);
    }
  }
}
