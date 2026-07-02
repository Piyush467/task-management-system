import { NextFunction, Request, Response } from "express";

import ApiError from "../utils/ApiError";
import { HTTP_STATUS } from "../utils/constants";

import { UserRole } from "../types/user.types";

export const authorize =
    (...roles: UserRole[]) =>
        (
            req: Request,
            _res: Response,
            next: NextFunction
        ) => {
            if (!req.user) {
                return next(
                    new ApiError(
                        HTTP_STATUS.UNAUTHORIZED,
                        "Authentication required"
                    )
                );
            }

            if (!roles.includes(req.user.role)) {
                return next(
                    new ApiError(
                        HTTP_STATUS.FORBIDDEN,
                        "Access denied"
                    )
                );
            }

            next();
        };