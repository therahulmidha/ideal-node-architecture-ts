import { Application, Router } from "express";
const router = Router();
import userRoutes from '../routes/user_routes'
export default function () {
    router.use('/user', userRoutes);
    return router;
}