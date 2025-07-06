import { validate } from "../validation/validation.js";
import {
  createEducationValidation,
  getEducationValidation,
  updateEducationValidation,
  searchEducationValidation,
  deleteEducationValidation,
} from "../validation/education-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const education = validate(createEducationValidation, request);

  return prismaClient.education.create({
    data: education,
    select: {
      educationId: true,
      level: true,
      major: true,
    },
  });
};

// const get = async () => {
//   const education = await prismaClient.education.findFirst();
//   if (!education) {
//     throw new ResponseError(404, "Education not found");
//   }
//   return education;
// };

const getById = async (educationId) => {
  const education = await prismaClient.education.findUnique({
    where: {
      educationId: Number(educationId),
    },
    select: {
      educationId: true,
      level: true,
      major: true,
    },
  });
  if (!education) {
    throw new ResponseError(404, "Education not found");
  }
  return education;
};

const update = async (request) => {
  const education = validate(updateEducationValidation, request);
  const totalEducationInDatabase = await prismaClient.education.count({
    where: {
      educationId: education.educationId,
    },
  });

  if (totalEducationInDatabase !== 1) {
    throw new ResponseError(404, "Education is not found");
  }

  const data = {};
  if (education.level) {
    data.level = education.level;
  }
  if (education.major) {
    data.major = education.major;
  }

  return prismaClient.education.update({
    where: {
      educationId: education.educationId,
    },
    data: data,
    select: {
      educationId: true,
      level: true,
      major: true,
    },
  });
};

const remove = async (educationId) => {
  const education = await getById(educationId);
  return prismaClient.education.delete({
    where: {
      educationId: education.educationId,
    },
  });
};

const search = async (request) => {
  request = validate(searchEducationValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.level && request.level.trim() !== "") {
    filters.push({
      level: {
        contains: request.level,
      },
    });
  }
  if (request.major && request.major.trim() !== "") {
    filters.push({
      major: {
        contains: request.major,
      },
    });
  }

  try {
    const educations = await prismaClient.education.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.education.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: educations,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma education search error:", err);
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
