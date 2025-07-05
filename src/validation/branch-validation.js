import Joi from "joi";

const createBranchValidation = Joi.object({
  branchName: Joi.string().max(100).required(),
});

const getBranchValidation = Joi.string().max(100).optional();

const updateBranchValidation = Joi.object({
  branchId: Joi.number().required(),
  branchName: Joi.string().max(100).required(),
});

const deleteBranchValidation = Joi.object({
  branchId: Joi.number().required(),
});

const searchBranchValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  branchName: Joi.string().optional(),
});

export {
  createBranchValidation,
  getBranchValidation,
  updateBranchValidation,
  deleteBranchValidation,
  searchBranchValidation,
};
