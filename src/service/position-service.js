import { validate } from "../validation/validation.js";
import {
  createPositionValidation,
  getPositionValidation,
  updatePositionValidation,
  searchPositionValidation,
  deletePositionValidation,
} from "../validation/position-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const position = validate(createPositionValidation, request);

  return prismaClient.position.create({
    data: position,
    select: {
      positionId: true,
      positionName: true,
    },
  });
};

// const get = async () => {
//   const position = await prismaClient.position.findFirst();
//   if (!position) {
//     throw new ResponseError(404, "Position not found");
//   }
//   return position;
// };

const getById = async (positionId) => {
  const position = await prismaClient.position.findUnique({
    where: {
      positionId: Number(positionId),
    },
    select: {
      positionId: true,
      positionName: true,
    },
  });
  if (!position) {
    throw new ResponseError(404, "Position not found");
  }
  return position;
};

const update = async (request) => {
  const position = validate(updatePositionValidation, request);
  const totalPositionInDatabase = await prismaClient.position.count({
    where: {
      positionId: position.positionId,
    },
  });

  if (totalPositionInDatabase !== 1) {
    throw new ResponseError(404, "Position is not found");
  }

  const data = {};
  if (position.positionName) {
    data.positionName = position.positionName;
  }

  return prismaClient.position.update({
    where: {
      positionId: position.positionId,
    },
    data: data,
    select: {
      positionId: true,
      positionName: true,
    },
  });
};

const remove = async (positionId) => {
  const position = await getById(positionId);
  return prismaClient.position.delete({
    where: {
      positionId: position.positionId,
    },
  });
};

const search = async (request) => {
  request = validate(searchPositionValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.positionName && request.positionName.trim() !== "") {
    filters.push({
      positionName: {
        contains: request.positionName,
      },
    });
  }

  try {
    const positions = await prismaClient.position.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.position.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: positions,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma position search error:", err);
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
