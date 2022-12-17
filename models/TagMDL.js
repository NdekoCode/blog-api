import { model, Schema } from "mongoose";
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
  },
  {
    timestamps: true,
  }
);
const TagMDL = new model("tag", TagSchema);
export default TagMDL;
