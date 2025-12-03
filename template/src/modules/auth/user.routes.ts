import { Router } from "express";
import { createUserController, getAllUsersController, loginUserController } from "./user.controller";
import { userValidator } from "./user.validator";
import { verifyToken } from "../../lib/jwt.auth";

const router = Router();

router.post("/register", userValidator.createUser, createUserController);
router.post("/login", loginUserController);
router.get("/", verifyToken, getAllUsersController);

export { router as userRoutes };    