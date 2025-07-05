import Joi from "joi";

const createUnitValidation = Joi.object({
  unitName: Joi.string().max(100).required(),
});

// const getUnitValidation = Joi.string().max(100).optional();

const updateUnitValidation = Joi.object({
  unitId: Joi.number().required(),
  unitName: Joi.string().max(100).required(),
});

const deleteUnitValidation = Joi.object({
  unitId: Joi.number().required(),
});

const searchUnitValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  unitName: Joi.string().optional(),
});

export {
  createUnitValidation,
  // getUnitValidation,
  updateUnitValidation,
  deleteUnitValidation,
  searchUnitValidation,
};
