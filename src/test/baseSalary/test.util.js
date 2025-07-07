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

export const removeAllTestBaseSalary = async () => {
  await prismaClient.baseSalary.deleteMany({});
};

export const createTestBaseSalary = async () => {
  await prismaClient.baseSalary.create({
    data: {
      amount: 1000000,
      type: "test",
      yearsOfService: "1",
    },
  });
};

export const getTestBaseSalary = async () => {
  return prismaClient.baseSalary.findFirst({
    where: { type: "test" },
  });
};
export const createManyTestBaseSalary = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.baseSalary.create({
      data: {
        amount: 1000000 + i,
        type: `test ${i}`,
        yearsOfService: `${i + 1}`,
      },
    });
  }
};
