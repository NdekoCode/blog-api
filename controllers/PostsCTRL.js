import slugify from "slugify";
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
  async addPost(req, res) {
    const validate = new Validator();
    const fieldRequired = ["title", "body"];
    const bodyRequest = { ...req.body };
    const alert = new Alert(req, res);
    validate
      .validateFormBody(bodyRequest)
      .validateRequiredFields(bodyRequest, fieldRequired);
    try {
      if (validate.varIsEmpty(validate.errors)) {
        bodyRequest.slug = slugify(bodyRequest.title.toLowerCase());
        const post = new PostMDL(bodyRequest);
        await post.save();
        return alert.success("Post ajouter avec succés", 201);
      }
      alert.danger(validate.errors["error"], 400);
    } catch (error) {
      alert.danger(error.message, 500);
    }
  }
}
