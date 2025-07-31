import { validate } from "../validation/validation.js";
import {
  createGradeValidation,
  searchGradeValidation,
  updateGradeValidation,
} from "../validation/grade-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const grade = validate(createGradeValidation, request);

  return prismaClient.grade.create({
    data: grade,
    select: {
      gradeId: true,
      gradeName: true,
      type: true,
      baseSalaryId: true,
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

const getById = async (gradeId) => {
  if (!gradeId || isNaN(Number(gradeId))) {
    throw new ResponseError(400, "gradeId is required and must be a number");
  }
  const grade = await prismaClient.grade.findUnique({
    where: {
      gradeId: Number(gradeId),
    },
    select: {
      gradeId: true,
      gradeName: true,
      type: true,
      baseSalaryId: true,
      baseSalary: {
        select: {
          amount: true,
          yearsOfService: true,
        },
      },
    },
  });
  if (!grade) {
    throw new ResponseError(404, "Grade not found");
  }
  // Flatten baseSalary fields for test expectations
  return {
    ...grade,
    amount: grade.baseSalary?.amount,
    yearsOfService: grade.baseSalary?.yearsOfService,
  };
};

const update = async (gradeId, requestBody) => {
  // Only validate the request body, not params
  const grade = validate(updateGradeValidation, requestBody);

  // Check if grade exists
  const totalGradeInDatabase = await prismaClient.grade.count({
    where: {
      gradeId: Number(gradeId),
    },
  });
  if (totalGradeInDatabase !== 1) {
    throw new ResponseError(404, "Grade is not found");
  }

  const data = {};
  if (grade.baseSalaryId) {
    data.baseSalaryId = grade.baseSalaryId;
  }
  if (grade.type) {
    data.type = grade.type;
  }
  if (grade.gradeName) {
    data.gradeName = grade.gradeName;
  }

  return prismaClient.grade.update({
    where: {
      gradeId: Number(gradeId),
    },
    data: data,
    select: {
      gradeId: true,
      baseSalaryId: true,
      gradeName: true,
      type: true,
    },
  });
};

const remove = async (gradeId) => {
  const grade = await getById(gradeId);
  return prismaClient.grade.delete({
    where: {
      gradeId: grade.gradeId,
    },
  });
};

const search = async (request) => {
  request = validate(searchGradeValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.gradeName && request.gradeName.trim() !== "") {
    filters.push({
      gradeName: {
        contains: request.gradeName,
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

  try {
    const grades = await prismaClient.grade.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.grade.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: grades,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma grade search error:", err);
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
