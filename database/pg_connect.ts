import { Pool } from "pg";
import { loadEnvs } from "../config";
loadEnvs();


export class PgPool {
  static pools: { [key: string]: Pool } = {};
  static get(): Pool {
    try {
      if (
        !process.env.PG_HOST ||
        !process.env.PG_USER ||
        !process.env.PG_PASSWORD ||
        !process.env.PG_DATABASE ||
        !process.env.PG_PORT
      ) {
        throw new Error("DB configuration not found");
      }
      if (!PgPool.pools[process.env.PG_DATABASE]) {
        PgPool.pools[process.env.PG_DATABASE] = new Pool({
          user: process.env.PG_USER,
          host: process.env.PG_HOST,
          database: process.env.PG_DATABASE,
          password: process.env.PG_PASSWORD,
          port: parseInt(process.env.PG_PORT!),
        });
      }

      console.log(`Connected to postgres db`);
      return PgPool.pools[process.env.PG_DATABASE];
    } catch (error) {
      console.log(error);
      throw new Error("Unknown error");
    }
  }
}
