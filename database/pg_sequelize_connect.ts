import sequelize from "sequelize";
const Sequelize = sequelize.Sequelize;
import { loadEnvs } from "../config";
loadEnvs();

// db connection pool handled by sequelize
export const sequelizeInstance = new Sequelize(
  process.env.PG_DATABASE!,
  process.env.PG_USER!,
  process.env.PG_PASSWORD,
  {
    dialect: "postgres",
    host: process.env.PG_HOST,
  }
);
