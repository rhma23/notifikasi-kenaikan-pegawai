import { validate } from "../validation/validation.js";
import {
  createUnitValidation,
  getUnitValidation,
  updateUnitValidation,
} from "../validation/unit-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";

const create = async (request) => {
  const unit = validate(createUnitValidation, request);

  return prismaClient.unit.create({
    data: unit,
    select: {
      unitId: true,
      unitName: true,
    },
  });
};

const get = async () => {
  const unit = await prismaClient.unit.findFirst();
  if (!unit) {
    throw new ResponseError(404, "Unit not found");
  }
  return unit;
};

const getById = async (unitId) => {
  const unit = await prismaClient.unit.findUnique({
    where: {
      unitId: Number(unitId),
    },
    select: {
      unitId: true,
      unitName: true,
    },
  });
  if (!unit) {
    throw new ResponseError(404, "Unit not found");
  }
  return unit;
};

const update = async (request) => {
  const unit = validate(updateUnitValidation, request);
  const totalUnitInDatabase = await prismaClient.unit.count({
    where: {
      unitId: unit.unitId,
    },
  });

  if (totalUnitInDatabase !== 1) {
    throw new ResponseError(404, "Unit is not found");
  }

  const data = {};
  if (unit.unitName) {
    data.unitName = unit.unitName;
  }

  return prismaClient.unit.update({
    where: {
      unitId: unit.unitId,
    },
    data: data,
    select: {
      unitId: true,
      unitName: true,
    },
  });
};

const remove = async (unitId) => {
  const unit = await getById(unitId);
  return prismaClient.unit.delete({
    where: {
      unitId: unit.unitId,
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
