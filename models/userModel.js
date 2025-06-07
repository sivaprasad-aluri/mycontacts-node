import mongoose from "mongoose";

const user = mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Please add the user name!"],
    },
    email: {
      type: String,
      required: [true, "Please add the user email address!"],
      unique: [true, "Email address already taken"],
    },
    password: {
      type: String,
      required: [true, "Please add the user password!"],
    },
  },
  {
    timeStamps: true,
  }
);

export const UserSchema = mongoose.model("User", user);
