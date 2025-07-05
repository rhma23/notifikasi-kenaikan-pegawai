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

export const createManyTestUsers = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.user.create({
      data: {
        username: `test ${i}`,
        password: await bcrypt.hash("rahasia", 10),
        email: `test${i}@gmail.com`,
        phoneNumber: `0897897451${i}`,
        role: "admin",
        token: `test${i}`,
      },
    });
  }
};
