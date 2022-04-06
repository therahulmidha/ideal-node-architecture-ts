import { Router } from "express";
const router = Router();
import userRoutes from "./user_routes";
export default function () {
  router.use("/user", userRoutes);
  return router;
}
