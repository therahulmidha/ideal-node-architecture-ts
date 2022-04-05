import { Router } from "express";
import { UserController } from "../controllers/user_controller";
import { authorize } from "../middlewares/authorize";
const router = Router();
const userController = new UserController();

router.get("/", authorize, userController.getAllUsers);
router.get("/:id", userController.getUserById);
router.post("/", userController.saveUser);
router.put("/:id", userController.updateUserById);
router.delete("/:id", userController.deleteUserById);

export default router;