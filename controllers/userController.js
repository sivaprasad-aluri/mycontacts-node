import asyncHandler from "express-async-handler";
import { UserSchema } from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//@desc Register User
//@route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All Fields are mandatory!!");
  }

  const userAvailable = await UserSchema.findOne({ email });

  if (userAvailable) {
    res.status(400);
    throw new Error("User already exist!!!");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  console.log("Hashed Password:", hashedPassword);

  const user = await UserSchema.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User Created: ${user}`);

  if (user) {
    res.status(201).json({
      _id: user.id,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("User data is not valid!");
  }

  res.json({ message: "Register the user!!" });
});

//@desc Login User
//@route POST /api/user/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!!");
  }

  const user = await UserSchema.findOne({ email });
  // Compare pass word with HashPassword;
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not matched!");
  }
});

//@desc Current User
//@route GET /api/user/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  res.json({ message: "current user!!" });
});

export default {
  registerUser,
  loginUser,
  currentUser,
};
