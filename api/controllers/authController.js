import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {
  ACCESS_TOKEN_EXPIRES_IN,
  ACCESS_TOKEN_SECRET,
  APP_ENV,
} from "../utils/secret.js";
import crypto from "crypto";
import { forgetPasswordEmail } from "../utils/sendMail.js";

/**
 * @desc user registration
 * @route POST /api/v1/auth/register
 * @access PUBLIC
 */

// export const userRegistration = asyncHandler(async (req, res) => {
//   // get data
//   const { firstName, lastName, email, password, mobile } = req.body;

//   // check validation
//   if (!firstName || !lastName || !email || !password || !mobile) {
//     return res.status(400).json({ message: "All fields are required" });
//   }

//   // email existence
//   const userEmailCheck = await User.findOne({ email });

//   if (userEmailCheck) {
//     return res.status(400).json({ message: "Email already exists" });
//   }

//   // password hash
//   const hashPass = bcrypt.hashSync(password, 10);

//   // create new user
//   const user = await User.create({
//     firstName,
//     lastName,
//     email,
//     password: hashPass,
//     mobile,
//   });

//   res.status(200).json({
//     message: "User Created successful",
//   });
// });

export const userRegistration = asyncHandler(async (req, res) => {
  // get body data
  const { firstName, lastName, email, password, mobile } = req.body;

  // is empty
  if (!firstName || !lastName || !email || !mobile || !password) {
    throw new Error("all fields are required");
  }

  // find user
  const user = await User.findOne({ email });

  //if Email is already exists
  if (user) {
    throw new Error("Email already exists");
  }

  //password make hash
  const hashPassword = bcrypt.hashSync(password, 10);

  //create new user
  const newUser = await User.create({
    firstName,
    lastName,
    // slug: createSlug(firstName + "-" + lastName),
    email,
    password: hashPassword,
    mobile,
  });

  // response
  res
    .status(201)
    .json({ user: newUser, message: "User Registration successfully" });
});

/**
 * @desc user login
 * @route POST /api/v1/auth/login
 * @access PUBLIC
 */

export const userLogin = asyncHandler(async (req, res) => {
  // get data
  const { email, password } = req.body;

  //   validation

  if (!email || !password)
    return res.status(400).json({ message: "All Fields Are Required" });

  // find login user by email

  const loginUser = await User.findOne({ email });

  //   user not found

  if (!loginUser)
    return res.status(400).json({ message: " Wrong Email Address " });

  // password check

  const passwordCheck = await bcrypt.compare(password, loginUser.password);

  // password matching

  if (!passwordCheck)
    return res.status(400).json({ message: " Wrong Password " });

  // create access token

  const accessToken = jwt.sign(
    { email: loginUser.email },
    ACCESS_TOKEN_SECRET,
    {
      expiresIn: ACCESS_TOKEN_EXPIRES_IN,
    }
  );

  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: process.env.APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    maxAge: 7 * 24 * 60 * 60 * 1000,
    path: "/",
  });

  res.status(200).json({
    accessToken,
    user: loginUser,
    message: "User Login successful 🥳",
  });
});

/**
 * @DESC Login admin with username and password
 * @ROUTE POST api/v1/user/login
 * @ACCESS public
 */

export const adminLogin = asyncHandler(async (req, res) => {
  // get body data

  const { email, password } = req.body;

  // is empty

  if (!email || !password)
    return res.status(400).json({ message: "all fields are required" });

  // find admin by email

  const admin = await User.findOne({ email });

  // check if admin not found

  if (!admin) return res.status(400).json({ message: "User not found" });

  // check if you are an admin or not

  if (admin.role !== "Admin")
    return res.status(400).json({ message: "You Are Not An Admin ! " });

  // password check

  const passwordCheck = await bcrypt.compare(password, admin.password);

  // password matching

  if (!passwordCheck)
    return res.status(400).json({ message: " Wrong Password " });

  // Token Generated

  // const accessToken = generateToken(admin.email);

  // const accessToken = jwtToken({ email: admin?.email }, 1000 * 60 * 60 * 12);

  // create access token

  const accessToken = jwt.sign({ email: admin.email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRES_IN,
  });

  //set cookie
  res.cookie("accessToken", accessToken, {
    httpOnly: true,
    secure: APP_ENV == "Development" ? false : true,
    sameSite: "strict",
    path: "/",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  //response
  res.status(200).json({ user: admin, message: "Login Success", accessToken });
});

/**
 * @desc user logOut
 * @route POST /api/v1/auth/logoOut
 * @access PUBLIC
 */

export const userLoOut = asyncHandler(async (req, res) => {
  res.clearCookie("accessToken");
  res.status(200).json({ message: "Logout successful" });
});

/**
 * @desc user loggedIn
 * @route GET /api/v1/auth/me
 * @access PUBLIC
 */

export const loggedInUser = asyncHandler(async (req, res) => {
  res.status(200).json(req.me);
});

/**
 * @desc Updated password
 * @route POST api/v1/auth/user/updatePassword
 * @access public
 */

export const updatePassword = asyncHandler(async (req, res) => {
  // get body data

  const { oldPassword, password } = req.body;

  //get user email

  const { email } = req.me;

  // check field is empty

  if (!oldPassword || !password)
    return res.status(400).json("all field are required!");

  // got the valid user

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("Invalid user");

  //check old password is correct

  if (bcrypt.compareSync(oldPassword, user.password) === false)
    return res.status(400).json("Old Password is incorrect");

  //password make hash

  const hashPassword = bcrypt.hashSync(password, 10);

  //update new password

  const updatePassword = await User.findByIdAndUpdate(user._id, {
    password: hashPassword,
  });

  //response update

  res
    .status(200)
    .json({ message: "Password updated successfully", updatePassword });
});

/**
 * @desc forgot Password Token
 * @route POST api/v1/auth/user/forgotPasswordToken
 * @access public
 */

export const forgotPasswordToken = asyncHandler(async (req, res) => {
  // get body data

  const { email } = req.body;

  // check if email field is empty

  if (!email) return res.status(400).json("Email is required!");

  // got the valid user

  const user = await User.findOne({ email });

  // if user is not found

  if (!user) return res.status(400).json("user Not found!");

  // generate random Token secret

  const secret = crypto.randomBytes(32).toString("hex");

  // generate password reset token

  const resetToken = crypto.createHash("sha256").update(secret).digest("hex");

  // generate token Expire

  const expireToken = Date.now() + 10 * 60 * 1000;

  // update token

  const forgetPassword = await User.findByIdAndUpdate(user._id, {
    passwordResetToken: resetToken,
    passwordResetExpires: expireToken,
  });

  //send mail
  const sendMail = forgetPasswordEmail({
    to: user.email,
    name: `${user.firstName} ${user.lastName}`,
    token: `http://localhost:3000/resetPassword/${resetToken}`,
  });

  // user response

  res.status(200).json({ message: "Forget password mail Send" });
});

/**
 * @desc reset Password
 * @route POST api/v1/auth/user/resetPassword
 * @access public
 */

export const resetPassword = asyncHandler(async (req, res) => {
  // get body data

  const { token } = req.params;

  // token validation

  if (!token) return res.status(400).json("Invalid token");

  // get body data

  const { password } = req.body;

  // check field is empty

  if (!password)
    return res.status(400).json("Password Field must not be empty!");

  // check token is valid

  const user = await User.findOne({
    passwordResetToken: token,
    passwordResetExpires: { $gt: Date.now() },
  });

  // user token Expires validation

  if (!user) return res.status(400).json("Token is Expired try to again");

  //password make hash

  const hashPassword = bcrypt.hashSync(password, 10);

  //update password

  user.password = hashPassword;
  user.passwordResetToken = null;
  user.passwordResetExpires = null;
  user.passwordChangedAt = Date.now();
  user.verify = true;
  await user.save();
  // user response
  res.status(200).json({ message: "password reset done" });
});
