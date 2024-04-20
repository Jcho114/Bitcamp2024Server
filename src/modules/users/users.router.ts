import { Router } from "express";
import userController from "./users.controller";
import { validateBody } from "../../middleware/validation.middleware";
import { UserLoginSchema, UserSignupSchema } from "./users.schemas";

const userRouter = Router();

userRouter.post("/login", validateBody(UserLoginSchema), userController.login);
userRouter.post("/signup", validateBody(UserSignupSchema), userController.signup);

export default userRouter;