import mongoose, { Schema } from "mongoose";

const UserScheme = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    password: {
      type: String,
      require: true,
    },
    photoURL: {
      type: String,
    },
    rule: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("users", UserScheme);
export default UserModel;
