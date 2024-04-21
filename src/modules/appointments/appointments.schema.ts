import Joi from "joi";

export const AppointmentCreateSchema = Joi.object({
  date: Joi.date().required(),
  tags: Joi.array().items(Joi.string()).required(),
  request: Joi.string().required(),
});

export const AppointmentResolveSchema = Joi.object({
  id: Joi.string().required(),
});
