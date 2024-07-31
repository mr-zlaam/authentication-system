import { NextFunction, Request, Response } from "express";
import { asyncHandler } from "../helper/asynhandlerUtil";
import { BAD_REQUEST, FORBIDDEN } from "../CONSTANTS";
import { verify } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config";
import { PayLoadType } from "../types";
export interface RequestUser extends Request {
  user?: PayLoadType;
}
export const ifUserIsAdmin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    if (decodedToken.role !== "ADMIN")
      throw { status: FORBIDDEN, message: "Only Admin can modify this data" };
    req.user = decodedToken;
    next();
  }
);
// For moderator who can only write the data
export const ifUserIsModerator_OR_Admin = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      // console.log(error.message);
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    if (decodedToken.role !== "ADMIN" && decodedToken.role !== "MODERATOR")
      throw {
        status: FORBIDDEN,
        message: "Only Admin or moderator can modify this data",
      };
    req.user = decodedToken;

    next();
  }
);
// If user is not login
export const ifUser = asyncHandler(
  async (req: RequestUser, res: Response, next: NextFunction) => {
    const token = req.header("Authorization");
    if (!token)
      throw { status: BAD_REQUEST, message: "unable to find any token" };
    const parsedToken = token?.split(" ")[1] || "";
    let decodedToken;
    try {
      decodedToken = verify(parsedToken, JWT_SECRET_KEY) as PayLoadType;
    } catch (error: any) {
      console.log(error.message);
      throw { status: 400, message: error.message || "invalid token!!" };
    }
    req.user = decodedToken;
    next();
  }
);
