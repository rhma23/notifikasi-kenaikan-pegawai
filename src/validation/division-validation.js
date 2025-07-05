import Joi from "joi";

const createDivisionValidation = Joi.object({
  divisionName: Joi.string().max(100).required(),
});

// const getDivisionValidation = Joi.string().max(100).optional();

const updateDivisionValidation = Joi.object({
  divisionId: Joi.number().required(),
  divisionName: Joi.string().max(100).required(),
});

const deleteDivisionValidation = Joi.object({
  divisionId: Joi.number().required(),
});

const searchDivisionValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  divisionName: Joi.string().optional(),
});

export {
  createDivisionValidation,
  // getDivisionValidation,
  updateDivisionValidation,
  deleteDivisionValidation,
  searchDivisionValidation,
};
