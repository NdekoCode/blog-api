import { model, Schema, Types } from "mongoose";
const PostSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    image: {
      type: [Types.ObjectId],
      required: false,
      ref: "image",
    },
    tags: {
      type: [Types.ObjectId],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const PostMDL = new model("post", PostSchema);
export default PostMDL;
