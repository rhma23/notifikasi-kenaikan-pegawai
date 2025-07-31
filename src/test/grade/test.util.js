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

export const removeAllTestBaseSalary = async () => {
  await prismaClient.grade.deleteMany({});
  await prismaClient.baseSalary.deleteMany({});
};

export const removeAllTestGrade = async () => {
  await prismaClient.grade.deleteMany({});
};

export const createTestGrade = async () => {
  const baseSalary = await prismaClient.baseSalary.create({
    data: {
      amount: 1000000,
      type: "test",
      yearsOfService: "1",
    },
  });
  await prismaClient.grade.create({
    data: {
      gradeName: "test",
      type: "test",
      baseSalaryId: baseSalary.baseSalaryId,
    },
  });
};

export const getTestGrade = async () => {
  return prismaClient.grade.findFirst({
    where: { gradeName: "test" },
  });
};

export const createManyTestGrade = async () => {
  const baseSalary = await prismaClient.baseSalary.create({
    data: {
      amount: 1000000,
      type: "test",
      yearsOfService: "1",
    },
  });
  for (let i = 0; i < 15; i++) {
    await prismaClient.grade.create({
      data: {
        gradeName: `test ${i}`,
        type: `test ${i}`,
        baseSalaryId: baseSalary.baseSalaryId,
      },
    });
  }
};
