import Joi from "joi";

export const ThreadCreateSchema = Joi.object({
  title: Joi.string().required(),
  content: Joi.string().required(),
  date: Joi.date().required(),
});

export const RootReplyCreateSchema = Joi.object({
  content: Joi.string().required(),
  date: Joi.date().required(),
});
