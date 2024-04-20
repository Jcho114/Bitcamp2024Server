import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

declare global {
  namespace Express {
    export interface Request {
      payload?: UserPayload;
    }
  }
}

interface UserPayload {
  id: string;
}

export function getIdFromPayload(req: Request, res: Response, next: NextFunction) {
  const authorization = req.headers.authorization;

  if (authorization && authorization.includes("Bearer ")) {
    const token = authorization.split(' ')[1];

    jwt.verify(token, process.env.JWT_SECRET as string, (err, payload) => {
      if (err) return res.status(403).send("invalid token");

      req.payload = payload as UserPayload;
      next();
    });
  } else {
    return res.status(403).send("invalid token");
  }
}