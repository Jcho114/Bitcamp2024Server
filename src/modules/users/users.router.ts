import { Router } from "express";
import userController from "./users.controller";
import { getIdFromPayload } from "../../middleware/jwt.middleware";

const userRouter = Router();

userRouter.get('/info/', getIdFromPayload, userController.getUserInfoById);

export default userRouter;
