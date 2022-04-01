import { Router } from "express";
import { UserController } from "../controllers/user_controller";
const router = Router();
const userController = new UserController();

// router.post("/", authorize, userController.getAllUsers);
router.get("/:id", userController.getUserById);
// router.post("/", userController.saveUser);
// router.get("/:id", userController.updateUserById);
// router.get("/:id", userController.deleteUserById);

export default router;