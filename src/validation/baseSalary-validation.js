import Joi from "joi";

const createBaseSalaryValidation = Joi.object({
  amount: Joi.number().min(0).required(),
  type: Joi.string().max(35).required(),
  yearsOfService: Joi.string().max(2).optional(),
});

// const getDivisionValidation = Joi.string().max(100).optional();

const updateBaseSalaryValidation = Joi.object({
  baseSalaryId: Joi.number().required(),
  amount: Joi.number().min(0).required(),
  type: Joi.string().max(35).required(),
  yearsOfService: Joi.string().max(2).optional(),
});

const deleteBaseSalaryValidation = Joi.object({
  baseSalaryId: Joi.number().required(),
});

const searchBaseSalaryValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  type: Joi.string().max(35).optional(),
  yearsOfService: Joi.string().max(2).optional(),
  amount: Joi.number().min(0).optional(),
});

export {
  createBaseSalaryValidation,
  // getBaseSalaryValidation,
  updateBaseSalaryValidation,
  deleteBaseSalaryValidation,
  searchBaseSalaryValidation,
};
