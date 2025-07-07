import { validate } from "../validation/validation.js";
import {
  createBaseSalaryValidation,
  getBaseSalaryValidation,
  updateBaseSalaryValidation,
  deleteBaseSalaryValidation,
  searchBaseSalaryValidation,
} from "../validation/baseSalary-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const baseSalary = validate(createBaseSalaryValidation, request);

  return prismaClient.baseSalary.create({
    data: baseSalary,
    select: {
      baseSalaryId: true,
      amount: true,
      type: true,
      yearsOfService: true,
    },
  });
};

// const get = async () => {
//   const baseSalary = await prismaClient.baseSalary.findFirst();
//   if (!baseSalary) {
//     throw new ResponseError(404, "Base Salary not found");
//   }
//   return baseSalary;
// };

const getById = async (baseSalaryId) => {
  if (!baseSalaryId || isNaN(Number(baseSalaryId))) {
    throw new ResponseError(
      400,
      "baseSalaryId is required and must be a number"
    );
  }
  const baseSalary = await prismaClient.baseSalary.findUnique({
    where: {
      baseSalaryId: Number(baseSalaryId),
    },
    select: {
      baseSalaryId: true,
      amount: true,
      type: true,
      yearsOfService: true,
    },
  });
  if (!baseSalary) {
    throw new ResponseError(404, "Base Salary not found");
  }
  return baseSalary;
};

const update = async (request) => {
  const baseSalary = validate(updateBaseSalaryValidation, request);
  const totalBaseSalaryInDatabase = await prismaClient.baseSalary.count({
    where: {
      baseSalaryId: baseSalary.baseSalaryId,
    },
  });

  if (totalBaseSalaryInDatabase !== 1) {
    throw new ResponseError(404, "Base Salary is not found");
  }

  const data = {};
  if (baseSalary.amount) {
    data.amount = baseSalary.amount;
  }
  if (baseSalary.type) {
    data.type = baseSalary.type;
  }
  if (baseSalary.yearsOfService) {
    data.yearsOfService = baseSalary.yearsOfService;
  }

  return prismaClient.baseSalary.update({
    where: {
      baseSalaryId: baseSalary.baseSalaryId,
    },
    data: data,
    select: {
      baseSalaryId: true,
      amount: true,
      type: true,
      yearsOfService: true,
    },
  });
};

const remove = async (baseSalaryId) => {
  const baseSalary = await getById(baseSalaryId);
  return prismaClient.baseSalary.delete({
    where: {
      baseSalaryId: baseSalary.baseSalaryId,
    },
  });
};

const search = async (request) => {
  request = validate(searchBaseSalaryValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.amount && request.amount.trim() !== "") {
    filters.push({
      amount: {
        contains: request.amount,
      },
    });
  }
  if (request.type && request.type.trim() !== "") {
    filters.push({
      type: {
        contains: request.type,
      },
    });
  }
  if (request.yearsOfService && request.yearsOfService.trim() !== "") {
    filters.push({
      yearsOfService: {
        contains: request.yearsOfService,
      },
    });
  }

  try {
    const baseSalaries = await prismaClient.baseSalary.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.baseSalary.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: baseSalaries,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma baseSalary search error:", err);
    throw err;
  }
};

export default {
  create,
  // get,
  getById,
  remove,
  update,
  search,
};
