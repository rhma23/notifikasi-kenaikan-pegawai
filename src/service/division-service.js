import { validate } from "../validation/validation.js";
import {
  createDivisionValidation,
  getDivisionValidation,
  updateDivisionValidation,
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

const get = async () => {
  const division = await prismaClient.division.findFirst();
  if (!division) {
    throw new ResponseError(404, "Division not found");
  }
  return division;
};

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

export default {
  create,
  get,
  getById,
  remove,
  update,
};
