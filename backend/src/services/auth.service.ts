import User from "../models/User";

import ApiError from "../utils/ApiError";
import { sanitizeUser } from "../utils/sanitizeUser";
import { HTTP_STATUS } from "../utils/constants";

import {
  RegisterInput,
  LoginInput,
} from "../validators/auth.schema";

export const registerUser = async (data: RegisterInput) => {
  const existingUser = await User.findOne({
    email: data.email,
  });

  if (existingUser) {
    throw new ApiError(
      HTTP_STATUS.CONFLICT,
      "Email already registered"
    );
  }

  const user = await User.create(data);

  return sanitizeUser(user);
};

export const loginUser = async (data: LoginInput) => {
  const user = await User.findOne({
    email: data.email,
  }).select("+password");

  if (!user) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  const isPasswordCorrect =
    await user.comparePassword(data.password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      HTTP_STATUS.UNAUTHORIZED,
      "Invalid email or password"
    );
  }

  return sanitizeUser(user);
};