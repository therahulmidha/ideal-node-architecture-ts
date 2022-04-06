import dotenv from "dotenv";

export function loadEnvs() {
  dotenv.config({
    path: `.env.${process.env.NODE_ENV || "development"}`,
    override: true,
  });
}
