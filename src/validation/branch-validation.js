import Joi from "joi";

const createBranchValidation = Joi.object({
  branchName: Joi.string().max(100).required(),
});

const getBranchValidation = Joi.string().max(100).optional();

export { createBranchValidation, getBranchValidation };
