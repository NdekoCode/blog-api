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
    tags: [Types.ObjectId],
  },
  {
    timestamps: true,
  }
);
const PostMDL = new model("post", PostSchema);
export default PostMDL;
