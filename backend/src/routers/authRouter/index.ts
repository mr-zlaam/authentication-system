import { Router } from "express";

import {
  loginControlller,
  registerController,
  verifyUserController,
} from "../../controllers/authControllers";
import { userValidators } from "../../validation";
const authRouter = Router();
authRouter.route("/registerUser").post(userValidators, registerController);

authRouter.route("/verifyUser").post(verifyUserController);

authRouter.route("/loginUser").post(loginControlller);

authRouter.route("/hero").get((req, res) => {
  return res.send("hello world");
});

export { authRouter };
