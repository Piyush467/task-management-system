import { IUser } from "./user.types";

export interface AuthResponse {
  user: IUser;
  token: string;
}