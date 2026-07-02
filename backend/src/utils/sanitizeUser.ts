import { IUser } from "../types/user.types";

export const sanitizeUser = (user: IUser) => {
  const userObject = user.toObject();

  delete userObject.password;
  delete userObject.__v;

  return userObject;
};
