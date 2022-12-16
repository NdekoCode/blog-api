import { model, Schema, Types } from "mongoose";
const ImageSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    url: {
      type: String,
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: false,
    },
    postId: {
      type: Types.ObjectId,
      ref: "Post",
      required: false,
    },
    description: {
      type: String,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);
const ImageMDL = new model("image", ImageSchema);
export default ImageMDL;
