import express from "express";
import helmet from "helmet";
import compression from "compression";
import { loadEnvs } from "./config";
import { MongoConnect } from "./database/mongo_connect";
import { handleFailures } from "./startup/failure_handler";
import { initializeRoutes } from "./startup/route_handler";

(async () => {
  loadEnvs();

  // initialize mongo connection
  await MongoConnect.initializeConnection();

  // initialize postgres sequelize connection
  // await sequelizeInstance.sync();
  // console.log("Pg Database connection successful");

  // sequelize relationship examples:
  // https://github.com/therahulmidha/MaxNodeProjects/blob/76aaeafb8bd05a1d88fcee7a8234fc32d0d472ee/max-node/index.js#L53

  // initialize route handling
  const app = express();
  initializeRoutes(app);

  // use helmet, compression modules for production env
  if (process.env.NODE_ENV === "production") {
    app.use(helmet());
    app.use(compression());
  }

  // handle unexpected failures
  handleFailures();
})();
