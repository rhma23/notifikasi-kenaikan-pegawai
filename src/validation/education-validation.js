import Joi from "joi";

const createEducationValidation = Joi.object({
  level: Joi.string().max(35).required(),
  major: Joi.string().max(35).required(),
});

// const getEducationValidation = Joi.string().max(100).optional();

const updateEducationValidation = Joi.object({
  educationId: Joi.number().required(),
  level: Joi.string().max(35).required(),
  major: Joi.string().max(35).required(),
});

const deleteEducationValidation = Joi.object({
  educationId: Joi.number().required(),
});

const searchEducationValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  level: Joi.string().max(35).optional(),
  major: Joi.string().max(35).optional(),
});

export {
  createEducationValidation,
  // getEducationValidation,
  updateEducationValidation,
  deleteEducationValidation,
  searchEducationValidation,
};
