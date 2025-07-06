import Joi from "joi";

const createPositionValidation = Joi.object({
  positionName: Joi.string().max(100).required(),
});

// const getPositionValidation = Joi.string().max(100).optional();

const updatePositionValidation = Joi.object({
  positionId: Joi.number().required(),
  positionName: Joi.string().max(100).required(),
});

const deletePositionValidation = Joi.object({
  positionId: Joi.number().required(),
});

const searchPositionValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  positionName: Joi.string().optional(),
});

export {
  createPositionValidation,
  // getPositionValidation,
  updatePositionValidation,
  deletePositionValidation,
  searchPositionValidation,
};
