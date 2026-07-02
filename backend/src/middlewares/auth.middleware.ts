import { NextFunction, Request, Response } from "express";

import User from "../models/User";

import ApiError from "../utils/ApiError";
import { verifyToken } from "../utils/jwt";
import { HTTP_STATUS } from "../utils/constants";

export const protect = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    let token: string | undefined;

    if (req.cookies?.accessToken) {
      token = req.cookies.accessToken;
    }

    if (
      !token &&
      req.headers.authorization?.startsWith("Bearer ")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "Authentication required"
      );
    }

    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);

    if (!user) {
      throw new ApiError(
        HTTP_STATUS.UNAUTHORIZED,
        "User not found"
      );
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};