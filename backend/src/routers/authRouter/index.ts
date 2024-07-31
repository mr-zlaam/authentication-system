import { Router } from "express";

import { ifUser, ifUserIsAdmin } from "../../middlewares/authMiddleware";
import { registerController } from "../../controllers/authControllers";
import { userValidators } from "../../validation";
const authRouter = Router();
authRouter.route("/registerUser").post(userValidators, registerController);

export { authRouter };
