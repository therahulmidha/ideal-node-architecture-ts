import express, { Response, Request } from "express";
import { MongoHandler } from "./startup/mongo_handler";
import dotenv from "dotenv";
import v1Routes from "./startup/v1_routes";

const app = express();
dotenv.config({ path: `.env.${process.env.NODE_ENV || "development"}`, override: true });
const PORT = process.env.SERVER_PORT || 3000;

(async () => {
  await MongoHandler.initializeConnection();

  // Just to know if server is running
  app.get("/", (req: Request, res: Response) => {
    res.send("Welcome to ideal node architecture ts app");
  });

  app.use("/v1.0", v1Routes());

  // app.use for error handling 
  // app.use for not found

  // use helmet, compression modules for production env
  // refer well organized node project

  // process.unhandledRejection

  app.listen(PORT, () => {
    console.log(`Server listening at port: ${PORT}`);
  });
})();