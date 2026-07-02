import { CookieOptions } from "express";
import { env } from "../config/env";

export const cookieOptions: CookieOptions = {
  httpOnly: true,

  secure: env.NODE_ENV === "production",

  sameSite: "lax",

  maxAge:
    env.COOKIE_EXPIRES_IN *
    24 *
    60 *
    60 *
    1000,
};