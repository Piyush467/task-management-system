import { UserRole } from "./user.types";

export interface JwtPayload {
  id: string;
  role: UserRole;
}