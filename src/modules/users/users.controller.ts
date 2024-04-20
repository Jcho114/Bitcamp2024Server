import { Request, Response } from "express";
import userService from "./users.service";

async function getUserInfoById(req: Request, res: Response) {
  const id = req.payload?.id;
  const user = await userService.getUserInfoById(id as string);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(400).send("unable to find user");
}

const userController = {
  getUserInfoById,
}

export default userController;