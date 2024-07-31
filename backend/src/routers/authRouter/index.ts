import { Router } from "express";

import { ifUser, ifUserIsAdmin } from "../../middlewares/authMiddleware";
import {
  registerController,
  verifyUserController,
} from "../../controllers/authControllers";
import { userValidators } from "../../validation";
const authRouter = Router();
authRouter.route("/registerUser").post(userValidators, registerController);
authRouter.route("/verifyUser").post(verifyUserController);
authRouter.route("/hero").post((req, res) => {
  return res.send("hello world");
});

export { authRouter };
