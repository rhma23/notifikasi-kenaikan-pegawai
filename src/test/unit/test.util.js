import { prismaClient } from "../../application/database";
import bcrypt from "bcrypt";
export const removeTestUser = async () => {
  await prismaClient.user.deleteMany({
    where: {
      username: "test",
    },
  });
};

export const createTestUser = async () => {
  await prismaClient.user.create({
    data: {
      username: "test",
      password: await bcrypt.hash("rahasia", 10),
      email: "test@gmail.com",
      phoneNumber: "08978974515",
      role: "admin",
      token: "test",
    },
  });
};

export const getTestUser = async () => {
  return prismaClient.user.findUnique({
    where: {
      username: "test",
    },
  });
};

export const createManyTestUnits = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.unit.create({
      data: {
        unitName: `test ${i}`,
      },
    });
  }
};

export const createTestUnit = async () => {
  await prismaClient.unit.create({
    data: {
      unitName: "test",
    },
  });
};

export const removeAllTestUnit = async () => {
  await prismaClient.unit.deleteMany({});
};

export const getTestUnit = async () => {
  return prismaClient.unit.findFirst({
    where: { unitName: "test" },
  });
};
