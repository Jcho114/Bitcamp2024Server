import { Request, Response } from "express";
import threadService from "./threads.service";

async function createThread(req: Request, res: Response) {
  const authorId = req.payload?.id;
  const thread = {
    ...req.body,
    authorId,
  }
  const { id } = await threadService.createThread(thread);
  return res.status(201).json({ id });
}

async function getThreads(req: Request, res: Response) {
  const threads = await threadService.getThreads();
  return res.status(200).json(threads);
}

async function getThreadById(req: Request, res: Response) {
  const id = req.params.id;
  const thread = await threadService.getThreadById(id as string);
  if (thread) {
    return res.status(200).json(thread); 
  }
  return res.status(400).send("unable to find thread");
}

async function createRootReply(req: Request, res: Response) {
  const authorId = req.payload?.id;
  const threadId = req.params.id;
  const rootReply = {
    ...req.body,
    threadId,
    authorId,
  }
  const { id } = await threadService.createRootReply(rootReply);
  return res.status(201).json({ id });
}

const threadController = {
  createThread,
  getThreads,
  getThreadById,
  createRootReply,
};

export default threadController;