import { NextFunction, Request, Response } from "express";
import { Schema } from "joi";

export const validateBody = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send(error.message);
  }

  return next();
}

export const validateQuery = (schema: Schema) => (req: Request, res: Response, next: NextFunction) => {
  const { error } = schema.validate(req.query);

  if (error) {
    return res.status(400).send(error.message);
  }

  return next();
}