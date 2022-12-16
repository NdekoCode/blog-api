import { model, Schema } from "mongoose";
const UserSchema = new Schema(
  {
    slug: {
      type: String,
      required: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      default: false,
    },
    gender: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      index: true,
    },
    username: {
      type: String,
      required: false,
    },
    image: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);
const UserMDL = new model("user", UserSchema);
class User {
  getProfileUrl() {
    return "";
  }
  static findByEmail(email) {
    return this.findOne({ email });
  }
}
UserSchema.indexes();
UserSchema.loadClass(User);
export default UserMDL;
