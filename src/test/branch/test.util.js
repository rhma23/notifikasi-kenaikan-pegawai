import { prismaClient } from "../../application/database.js";
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

export const createTestBranch = async () => {
  await prismaClient.branch.create({
    data: {
      branchName: "test",
    },
  });
};

export const removeAllTestBranch = async () => {
  await prismaClient.branch.deleteMany({});
};

export const getTestBranch = async () => {
  return prismaClient.branch.findFirst({
    where: { branchName: "test" },
  });
};

export const createManyTestBranches = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.branch.create({
      data: {
        branchName: `test ${i}`,
      },
    });
  }
};
