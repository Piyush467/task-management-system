import { Request, Response } from "express";

import ApiResponse from "../utils/ApiResponse";
import catchAsync from "../utils/catchAsync";
import { HTTP_STATUS } from "../utils/constants";
import { cookieOptions } from "../utils/cookies";
import { generateToken } from "../utils/jwt";
import { sanitizeUser } from "../utils/sanitizeUser";

import {
  registerUser,
  loginUser,
} from "../services/auth.service";

export const register = catchAsync(async (req: Request, res: Response) => {
  const user = await registerUser(req.body);

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  res.cookie("accessToken", token, cookieOptions);

  return res.status(HTTP_STATUS.CREATED).json(
    new ApiResponse(true, "User registered successfully", {
      user,
      token,
    })
  );
});

export const login = catchAsync(async (req: Request, res: Response) => {
  const user = await loginUser(req.body);

  const token = generateToken({
    id: user._id.toString(),
    role: user.role,
  });

  res.cookie("accessToken", token, cookieOptions);

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(true, "Login successful", {
      user,
      token,
    })
  );
});

export const logout = catchAsync(async (_req: Request, res: Response) => {
  res.clearCookie("accessToken");

  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(true, "Logout successful")
  );
});

export const me = catchAsync(async (req: Request, res: Response) => {
  return res.status(HTTP_STATUS.OK).json(
    new ApiResponse(
      true,
      "Profile fetched successfully",
      sanitizeUser(req.user!)
    )
  );
});