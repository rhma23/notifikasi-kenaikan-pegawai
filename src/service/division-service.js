import { validate } from "../validation/validation.js";
import {
  createDivisionValidation,
  getDivisionValidation,
  updateDivisionValidation,
  searchDivisionValidation,
  deleteDivisionValidation,
} from "../validation/division-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const division = validate(createDivisionValidation, request);

  return prismaClient.division.create({
    data: division,
    select: {
      divisionId: true,
      divisionName: true,
    },
  });
};

// const get = async () => {
//   const division = await prismaClient.division.findFirst();
//   if (!division) {
//     throw new ResponseError(404, "Division not found");
//   }
//   return division;
// };

const getById = async (divisionId) => {
  const division = await prismaClient.division.findUnique({
    where: {
      divisionId: Number(divisionId),
    },
    select: {
      divisionId: true,
      divisionName: true,
    },
  });
  if (!division) {
    throw new ResponseError(404, "Division not found");
  }
  return division;
};

const update = async (request) => {
  const division = validate(updateDivisionValidation, request);
  const totalDivisionInDatabase = await prismaClient.division.count({
    where: {
      divisionId: division.divisionId,
    },
  });

  if (totalDivisionInDatabase !== 1) {
    throw new ResponseError(404, "Division is not found");
  }

  const data = {};
  if (division.divisionName) {
    data.divisionName = division.divisionName;
  }

  return prismaClient.division.update({
    where: {
      divisionId: division.divisionId,
    },
    data: data,
    select: {
      divisionId: true,
      divisionName: true,
    },
  });
};

const remove = async (divisionId) => {
  const division = await getById(divisionId);
  return prismaClient.division.delete({
    where: {
      divisionId: division.divisionId,
    },
  });
};

const search = async (request) => {
  request = validate(searchDivisionValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.divisionName && request.divisionName.trim() !== "") {
    filters.push({
      divisionName: {
        contains: request.divisionName,
      },
    });
  }

  try {
    const divisions = await prismaClient.division.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.division.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: divisions,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma division search error:", err);
    throw err;
  }
};

export default {
  create,
  // get,
  getById,
  search,
  remove,
  update,
};
