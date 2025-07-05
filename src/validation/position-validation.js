import Joi from "joi";

const createPositionValidation = Joi.object({
  positionName: Joi.string().max(100).required(),
});

const getPositionValidation = Joi.string().max(100).optional();

const updatePositionValidation = Joi.object({
  positionId: Joi.number().required(),
  positionName: Joi.string().max(100).required(),
});

const deletePositionValidation = Joi.object({
  positionId: Joi.number().required(),
});

export {
  createPositionValidation,
  getPositionValidation,
  updatePositionValidation,
  deletePositionValidation,
};
