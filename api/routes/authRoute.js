import express from "express";
import {
  adminLogin,
  forgotPasswordToken,
  loggedInUser,
  resetPassword,
  updatePassword,
  userLoOut,
  userLogin,
  userRegistration,
} from "../controllers/authController.js";

//router
const router = express.Router();

//create routes
router.route("/login").post(userLogin);
router.route("/admin").post(adminLogin);
router.route("/logOut").post(userLoOut);
router.route("/register").post(userRegistration);

router.route("/me").get(loggedInUser);

router.route("/user/updatePassword").post(updatePassword);
router.route("/user/forgetPassword").post(forgotPasswordToken);
router.route("/user/resetPassword/:token").post(resetPassword);

//export
export default router;
