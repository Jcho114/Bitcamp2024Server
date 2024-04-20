import { Request, Response } from "express";
import authService from "./auth.service";

async function login(req: Request, res: Response) {
  const user = req.body;
  const jwts = await authService.login(user.email, user.password);
  if (!jwts) {
    return res.status(403).send("unable to login");
  }
  return res.status(201).json(jwts)
}

async function signup(req: Request, res: Response) {
  const user = req.body;
  const jwts = await authService.signup(user.name, user.email, user.password);
  if (!jwts) {
    return res.status(403).send("unable to signup");
  }
  return res.status(201).json(jwts);
}


// TODO
async function refresh(req: Request, res: Response) {
}

const authController = {
  login,
  signup,
}

export default authController;