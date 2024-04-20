import { Request, Response } from "express";
import userService from "./users.service";

async function login(req: Request, res: Response) {
  const user = req.body;
  const jwt = await userService.login(user.email, user.password);
  if (!jwt) {
    return res.status(403).send("unable to login");
  }
  return res.status(201).json({
    accessToken: jwt
  })
}

async function signup(req: Request, res: Response) {
  const user = req.body;
  const jwt = await userService.signup(user.name, user.email, user.password);
  if (!jwt) {
    return res.status(403).send("unable to signup");
  }
  return res.status(201).json({
    accessToken: jwt
  })
}

const userController = {
  login,
  signup,
}

export default userController;