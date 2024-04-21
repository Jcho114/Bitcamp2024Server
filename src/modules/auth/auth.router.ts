import { Router } from "express";
import { validateBody } from "../../middleware/validation.middleware";
import { AuthLoginSchema, AuthSignupSchema } from "./auth.schemas";
import authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/login", authController.login);
authRouter.post("/signup", validateBody(AuthSignupSchema), authController.signup);

export default authRouter;
