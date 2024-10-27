import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import bcrypt from "bcryptjs";
import uniqid from "uniqid";
import { cloudDelete, cloudUpload } from "../utils/cloudinary.js";
import { forgetPasswordEmail } from "../utils/sendMail.js";
import crypto from "crypto";

/**
 * @desc get all users data
 * @route GET /users
 * @access PUBLIC
 */

export const getAllUser = asyncHandler(async (req, res) => {
  const users = await User.find().select("-password");

  if (users.length > 0) {
    return res.status(200).json(users);
  }

  return res.status(404).json({ message: "No Users Found" });
});

/**
 * @desc create new user
 * @route POST /users
 * @access PUBLIC
 */

export const createUser = asyncHandler(async (req, res) => {
  // get data
  const { name, email, password, role } = req.body;

  // check validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // email existence
  const emailCheck = await User.findOne({ email });

  if (emailCheck) {
    return res.status(400).json({ message: "Email already exists" });
  }

  // hash password
  const hash = await bcrypt.hash(password, 10);

  // create new user data
  const user = await User.create({
    name,
    email,
    password: hash,
    role,
  });

  // confirm create user

  // const successUser = await User.findById(user.id).populate("role");

  // send user access to email

  // sendMail({
  //   name,
  //   to: email,
  //   sub: "Account Access Info",
  //   msg: ` Your Account Login Access Is email: ${email} & password: ${password}`,
  // });

  // check
  if (user) {
    return res.status(201).json({ message: ` user created successful`, user });
  } else {
    return res.status(400).json({ message: "Invalid user data" });
  }
});

/**
 * @desc get Single users data
 * @route GET /users/:id
 * @access PUBLIC
 */
export const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select("-password").lean();

  if (!user) {
    return res.status(400).json({ message: "No user found" });
  }

  res.json(user);
});

/**
 * @desc delete user data
 * @route DELETE /users/:id
 * @access PUBLIC
 */
export const deleteUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);

  if (!user) {
    return res.status(400).json({ message: "User delete failed" });
  }

  // delete cloud image
  if (user?.photo?.public_id) {
    await cloudDelete(user?.photo?.public_id);
  }

  res.status(200).json({ message: "User Delete Successful", user });
});

/**
 * @desc update user data
 * @route PATCH /users/:id
 * @access PUBLIC
 */

export const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { firstName, lastName, email, address, mobile, gender } = req.body;

  console.log(req.body);

  // validation

  if (!firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  //find user
  const user = await User.findById(id);

  console.log(user);
  //if user not available
  if (!user) {
    return res.status(400).json("User Not Found");
  }

  //photo update
  let userPhoto = null;
  if (req.file) {
    const userP = await cloudUpload(req);
    userPhoto = {
      url: userP.url,
      public_id: userP.public_id,
    };
  }

  //delete images
  if (!userPhoto) {
    userPhoto = user?.photo;
  } else {
    if (user?.photo?.public_id) {
      await cloudDelete(user.photo?.public_id);
    }
  }

  // update user data

  const updateUser = await User.findByIdAndUpdate(
    id,
    {
      firstName,
      lastName,
      email,
      mobile,
      gender,
      address,
      photo: userPhoto ? userPhoto : null,
    },
    { new: true }
  );

  res.json({ message: `User updated successful`, user: updateUser });
});

/**
 * @desc update User Status
 * @route PATCH /user/status/:id
 * @access PUBLIC
 */

export const updateUserStatus = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const { status } = req.body;

  const updateUserStatus = await User.findByIdAndUpdate(
    id,
    {
      status: !status,
    },
    {
      new: true,
    }
  );

  res.json({
    message: `User Status Updated Successful`,
    user: updateUserStatus,
  });
});
