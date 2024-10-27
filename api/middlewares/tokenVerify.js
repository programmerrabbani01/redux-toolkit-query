import asyncHandler from "express-async-handler";
import User from "../models/UserModel.js";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_SECRET } from "../utils/secret.js";

// create token verify function

export const tokenVerify = (req, res, next) => {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) return res.status(400).json({ message: "Unauthorized" });

  jwt.verify(
    accessToken,
    ACCESS_TOKEN_SECRET,
    asyncHandler(async (err, decode) => {
      if (err) {
        return res.status(400).json({ message: "Invalid Token" });
      }

      const me = await User.findOne({ email: decode.email }).select(
        "-password"
      );

      req.me = me;

      next();
    })
  );
};

export const isAdmin = asyncHandler(async (req, res, next) => {
  try {
    const user = req.me;

    if (!user) {
      return res.status(403).json({ message: "User not found" });
    }

    if (user.role !== "Admin") {
      return res.status(403).json({ message: "You are not an admin" });
    }
    next();
  } catch (error) {
    // Handle errors here
    return res.status(403).json({ message: error.message });
  }
});
