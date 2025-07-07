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

export const removeAllTestEducation = async () => {
  await prismaClient.education.deleteMany({});
};
export const createTestEducation = async () => {
  await prismaClient.education.create({
    data: {
      level: "test",
      major: "test",
    },
  });
};

export const getTestEducation = async () => {
  return prismaClient.education.findFirst({
    where: { level: "test" },
  });
};
export const createManyTestEducation = async () => {
  for (let i = 0; i < 15; i++) {
    await prismaClient.education.create({
      data: {
        level: `test ${i}`,
        major: `test ${i}`,
      },
    });
  }
};
