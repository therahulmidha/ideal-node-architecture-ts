import { Request, Response, NextFunction } from "express";
import { BadRequestError, CustomError } from "../utils/response/error_handler";
export function errorHandler(
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // incorrect json format found in request body
  if (
    err.message.includes("Unexpected token") ||
    err.message.includes("JSON")
  ) {
    return new BadRequestError(res, "Invalid Request Body Data").getResponse();
  }

  if (err instanceof CustomError) {
    return err.getResponse();
  }

  return new CustomError(res, "Internal Server Error").getResponse();
}
