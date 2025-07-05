import Joi from "joi";

const createUserValidation = Joi.object({
  username: Joi.string().max(100).required(),
  password: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  phoneNumber: Joi.string().max(15).required(),
  role: Joi.string().required(),
});

const loginUserValidation = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

const getUserValidation = Joi.string().max(100).required();

const updateUserValidation = Joi.object({
  username: Joi.string().max(100).optional(),
  password: Joi.string().max(100).optional(),
  email: Joi.string().email().max(100).required().optional(),
  phoneNumber: Joi.string().max(15).required().optional(),
  role: Joi.string().required().optional(),
});

const searchUserValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  username: Joi.string().optional(),
  email: Joi.string().email().optional(),
  phoneNumber: Joi.string().optional(),
});

export {
  createUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  searchUserValidation,
};
