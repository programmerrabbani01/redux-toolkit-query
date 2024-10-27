import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";

import { userMulter } from "../utils/multer.js";

//router
const router = express.Router();

//routing
router.route("/").get(getAllUser).post(createUser);
router
  .route("/:id")
  .get(getSingleUser)
  .delete(deleteUser)
  .patch(userMulter, updateUser);

//export
export default router;
