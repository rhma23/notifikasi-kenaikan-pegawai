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

export const removeAllTestPosition = async () => {
  await prismaClient.position.deleteMany({});
};
export const createTestPosition = async () => {
  await prismaClient.position.create({
    data: {
      positionName: "test",
    },
  });
};

export const getTestPosition = async () => {
  return prismaClient.position.findFirst({
    where: { positionName: "test" },
  });
};
export const createManyTestPositions = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.position.create({
      data: {
        positionName: `test ${i}`,
      },
    });
  }
};
