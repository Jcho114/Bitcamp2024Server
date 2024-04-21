import { Router } from "express";
import { getIdFromPayload } from "../../middleware/jwt.middleware";
import threadController from "./threads.controller";
import { RootReplyCreateSchema, ThreadCreateSchema } from "./threads.schema";
import { validateBody } from "../../middleware/validation.middleware";

const threadRouter = Router();

threadRouter.post("/create", getIdFromPayload, validateBody(ThreadCreateSchema), threadController.createThread);
threadRouter.get("/", getIdFromPayload, threadController.getThreads);
threadRouter.get("/:id", getIdFromPayload, threadController.getThreadById);
threadRouter.post("/:id/reply", getIdFromPayload, validateBody(RootReplyCreateSchema), threadController.createRootReply);

export default threadRouter;