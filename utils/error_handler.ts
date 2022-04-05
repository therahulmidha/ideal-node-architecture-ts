import { GenericResponse } from "../types/GenericResponse";
import { Response } from "express";
export class CustomError implements GenericResponse {
  response: Response;
  statusCode = 500;
  message = "Internal Server Error";
  info: string;

  constructor(response: Response, info: string, error?: any) {
    if (error) {
      console.log(error);
    }
    this.info = info;
    this.response = response;
  }

  getResponse() {
    return (
      this.response
        .status(this.statusCode)
        // .append("Access-Control-Allow-Origin", "*")
        .json({
          message: this.message,
          info: this.info,
        })
    );
  }
}

export class BadRequestError extends CustomError {
  statusCode = 400;
  message = "Bad Request";
}
export class ForbiddenError extends CustomError {
  statusCode = 403;
  message = "Forbidden";
}
export class NotFoundError extends CustomError {
  statusCode = 404;
  message = "Not Found";
}
export class ConflictError extends CustomError {
  statusCode = 409;
  message = "Conflict";
}

