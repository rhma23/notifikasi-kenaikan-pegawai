import Joi from "joi";

const createEmployeeValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  phoneNumber: Joi.string().max(15).required(),
  role: Joi.string().required(),
});
