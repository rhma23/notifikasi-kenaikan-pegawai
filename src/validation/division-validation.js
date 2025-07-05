import Joi from "joi";

const createDivisionValidation = Joi.object({
  divisionName: Joi.string().max(100).required(),
});

const getDivisionValidation = Joi.string().max(100).optional();

const updateDivisionValidation = Joi.object({
  divisionId: Joi.number().required(),
  divisionName: Joi.string().max(100).required(),
});

const deleteDivisionValidation = Joi.object({
  divisionId: Joi.number().required(),
});

export {
  createDivisionValidation,
  getDivisionValidation,
  updateDivisionValidation,
  deleteDivisionValidation,
};
