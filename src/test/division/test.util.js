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

export const removeAllTestDivision = async () => {
  await prismaClient.division.deleteMany({}); // Delete all divisions for clean state
};
export const createTestDivision = async () => {
  await prismaClient.division.create({
    data: {
      divisionName: "test",
    },
  });
};
export const getTestDivision = async () => {
  return prismaClient.division.findFirst({
    where: { divisionName: "test" },
  });
};
export const createManyTestDivisions = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.division.create({
      data: {
        divisionName: `test ${i}`,
      },
    });
  }
};
