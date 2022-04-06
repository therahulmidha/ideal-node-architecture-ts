import { Response } from "express";
import { GenericResponse } from "../types/GenericResponse";

export class ResponseHandler implements GenericResponse {
  response: Response;
  statusCode = 200;
  message = "Status OK";
  info: string;
  data: any[] | Record<string, any>;

  constructor(
    response: Response,
    info: string,
    data: any[] | Record<string, any>
  ) {
    this.info = info;
    this.data = data;
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
          data: this.data,
        })
    );
  }
}
