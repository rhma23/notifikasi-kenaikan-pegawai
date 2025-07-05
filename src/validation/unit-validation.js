import Joi from "joi";

const createUnitValidation = Joi.object({
  unitName: Joi.string().max(100).required(),
});

const getUnitValidation = Joi.string().max(100).optional();

const updateUnitValidation = Joi.object({
  unitId: Joi.number().required(),
  unitName: Joi.string().max(100).required(),
});

const deleteUnitValidation = Joi.object({
  unitId: Joi.number().required(),
});

export {
  createUnitValidation,
  getUnitValidation,
  updateUnitValidation,
  deleteUnitValidation,
};
