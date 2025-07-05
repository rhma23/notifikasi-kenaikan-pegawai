import { validate } from "../validation/validation.js";
import {
  createBranchValidation,
  getBranchValidation,
  updateBranchValidation,
  deleteBranchValidation,
  searchBranchValidation,
} from "../validation/branch-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const branch = validate(createBranchValidation, request);

  return prismaClient.branch.create({
    data: branch,
    select: {
      branchId: true,
      branchName: true,
    },
  });
};

const get = async () => {
  const branch = await prismaClient.branch.findFirst();
  if (!branch) {
    throw new ResponseError(404, "Branch not found");
  }
  return branch;
};

const getById = async (branchId) => {
  if (!branchId || isNaN(Number(branchId))) {
    throw new ResponseError(400, "branchId is required and must be a number");
  }
  const branch = await prismaClient.branch.findUnique({
    where: {
      branchId: Number(branchId),
    },
    select: {
      branchId: true,
      branchName: true,
    },
  });
  if (!branch) {
    throw new ResponseError(404, "Branch not found");
  }
  return branch;
};

const update = async (request) => {
  const branch = validate(updateBranchValidation, request);
  const totalBranchInDatabase = await prismaClient.branch.count({
    where: {
      branchId: branch.branchId,
    },
  });

  if (totalBranchInDatabase !== 1) {
    throw new ResponseError(404, "branch is not found");
  }

  const data = {};
  if (branch.branchName) {
    data.branchName = branch.branchName;
  }

  return prismaClient.branch.update({
    where: {
      branchId: branch.branchId,
    },
    data: data,
    select: {
      branchId: true,
      branchName: true,
    },
  });
};

const remove = async (branchId) => {
  const branch = await getById(branchId);
  return prismaClient.branch.delete({
    where: {
      branchId: branch.branchId,
    },
  });
};

const search = async (request) => {
  request = validate(searchBranchValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.branchName && request.branchName.trim() !== "") {
    filters.push({
      branchName: {
        contains: request.branchName,
      },
    });
  }

  try {
    const branches = await prismaClient.branch.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.branch.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: branches,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma branch search error:", err);
    throw err;
  }
};

export default {
  create,
  get,
  getById,
  remove,
  update,
  search,
};
