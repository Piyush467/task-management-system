import { Request, Response, NextFunction } from "express";
import { ZodError, ZodType } from "zod";
import ApiError from "../utils/ApiError";

const validate =
  (schema: ZodType) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsed = await schema.parseAsync({
        body: req.body,
      });

      // Replace only the body (this is writable)
      req.body = (parsed as { body: typeof req.body }).body;

      next();
    } catch (error) {
      if (error instanceof ZodError) {
        return next(
          new ApiError(
            400,
            error.issues.map((issue) => issue.message).join(", "),
          ),
        );
      }

      next(error);
    }
  };

export default validate;
