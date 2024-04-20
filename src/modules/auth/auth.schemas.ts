import Joi from "joi";

export const AuthLoginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required(),
});

export const AuthSignupSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().required(),
  password: Joi.string().required(),
});
