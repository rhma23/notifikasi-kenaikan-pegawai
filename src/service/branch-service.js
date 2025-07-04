import { validate } from "../validation/validation.js";
import {
  createBranchValidation,
  getBranchValidation,
} from "../validation/branch-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const branch = validate(createBranchValidation, request);

  return prismaClient.branch.create({
    data: branch,
    select: {
      branchName: true,
    },
  });
};

const get = async () => {
  const branch = await prismaClient.branch.findFirst({
    data: branch,
    select: {
      branchName: true,
    },
  });
  if (!branch) {
    throw new ResponseError(404, "Branch not found");
  }
  return branch;
};

const getById = async (branchId) => {
  const branch = await prismaClient.branch.findFirst({
    data: branch,
    where: {
      branchId: branchId,
    },
    select: {
      branchName: true,
    },
  });
  if (!branch) {
    throw new ResponseError(404, "Branch not found");
  }
  return branch;
};

export default {
  create,
  get,
  getById,
};
