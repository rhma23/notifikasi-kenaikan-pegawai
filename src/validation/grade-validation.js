import Joi from "joi";

const createGradeValidation = Joi.object({
  baseSalaryId: Joi.number().required(),
  gradeName: Joi.string().max(100).required(),
  type: Joi.string().max(100).required(),
});

// const getDivisionValidation = Joi.string().max(100).optional();

const updateGradeValidation = Joi.object({
  baseSalaryId: Joi.number().optional(),
  gradeName: Joi.string().max(100).optional(),
  type: Joi.string().max(100).optional(),
});

const deleteGradeValidation = Joi.object({
  gradeId: Joi.number().required(),
});

const searchGradeValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  type: Joi.string().max(35).optional(),
  gradeName: Joi.string().max(100).optional(),
  baseSalaryId: Joi.number().optional(),
  type: Joi.string().max(100).optional(),
});

export {
  createGradeValidation,
  // getGradeValidation,
  updateGradeValidation,
  deleteGradeValidation,
  searchGradeValidation,
};
