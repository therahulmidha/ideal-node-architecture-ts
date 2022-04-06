import express, { Application, Request, Response } from "express";
import { errorHandler } from "../middlewares/error_handler";
import v1Routes from "../routes/v1/index";
import { NotFoundError } from "../utils/response/error_handler";
export function initializeRoutes(app: Application) {
  const PORT = process.env.SERVER_PORT || 3000;
  // allow cross origin resource sharing
  // so that front end app on another server can access our backend
  //   app.use(cors());

  app.use(express.json());

  // Just to know if server is running
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to ideal node architecture ts app");
  });

  app.use("/api/v1.0", v1Routes());

  // middleware for handling internal server error
  app.use(errorHandler);

  // Middleware for unknown endpoints
  app.use(function (req, res, next) {
    return new NotFoundError(
      res,
      "Route " + req.url + " Not found."
    ).getResponse();
  });

  app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
  });
}
