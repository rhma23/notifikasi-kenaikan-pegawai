import { prismaClient } from "../application/database";
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
  await prismaClient.branch.deleteMany({
    where: {
      branchId: 1,
    },
  });
};

export const getTestBranch = async () => {
  return prismaClient.branch.findUnique({
    where: {
      branchId: 1,
    },
  });
};

// export const createTestContact = async () => {
//   await prismaClient.contact.create({
//     data: {
//       username: "test",
//       first_name: "test",
//       last_name: "test",
//       email: "test@gmail.com",
//       phone: "00897877877",
//     },
//   });
// };

// export const getTestContact = async () => {
//   return prismaClient.contact.findFirst({
//     where: {
//       username: "test",
//     },
//   });
// };
