import { model, Schema, Types } from "mongoose";
const TagSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: false,
    },
    posts: [
      {
        type: Types.ObjectId,
        ref: "Post",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);
const TagMDL = new model("Tag", TagSchema);
export default TagMDL;
