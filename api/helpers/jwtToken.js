import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../utils/secret.js";

//Generate Token

export const jwtToken = (data, time = "1d") => {
  const token = jwt.sign(data, JWT_SECRET, {
    expiresIn: time,
  });
  return token;
};

//verify the token
export const verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
