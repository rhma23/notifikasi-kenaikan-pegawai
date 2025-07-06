import { validate } from "../validation/validation.js";
import {
  createUserValidation,
  loginUserValidation,
  getUserValidation,
  updateUserValidation,
  searchUserValidation,
} from "../validation/user-validation.js";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const create = async (request) => {
  const user = validate(createUserValidation, request);

  const countUser = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (countUser > 0) {
    throw new ResponseError(400, "Username already exists");
  }

  user.password = await bcrypt.hash(user.password, 10);

  return prismaClient.user.create({
    data: user,
    select: {
      username: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
};

const login = async (request) => {
  const loginRequest = validate(loginUserValidation, request);

  const user = await prismaClient.user.findUnique({
    where: {
      username: loginRequest.username,
    },
    select: {
      username: true,
      password: true,
    },
  });

  if (!user) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const isPasswordValid = await bcrypt.compare(
    loginRequest.password,
    user.password
  );
  if (!isPasswordValid) {
    throw new ResponseError(401, "Username or password wrong");
  }

  const token = uuid().toString();
  return prismaClient.user.update({
    data: {
      token: token,
    },
    where: {
      username: user.username,
    },
    select: {
      token: true,
    },
  });
};

const get = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username: username,
    },
    select: {
      username: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });

  if (!user) {
    throw new ResponseError(404, "user is not found");
  }

  return user;
};

const getById = async (userId) => {
  if (!userId || isNaN(Number(userId))) {
    throw new ResponseError(400, "userId is required and must be a number");
  }
  const user = await prismaClient.user.findUnique({
    where: {
      userId: Number(userId),
    },
    select: {
      userId: true,
      username: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
  if (!user) {
    throw new ResponseError(404, "User not found");
  }
  return user;
};

const update = async (request) => {
  const user = validate(updateUserValidation, request);

  const totalUserInDatabase = await prismaClient.user.count({
    where: {
      username: user.username,
    },
  });

  if (totalUserInDatabase !== 1) {
    throw new ResponseError(404, "user is not found");
  }

  const data = {};
  if (user.email) {
    data.email = user.email;
  }
  if (user.phoneNumber) {
    data.phoneNumber = user.phoneNumber;
  }
  if (user.role) {
    data.role = user.role;
  }
  if (user.password) {
    data.password = await bcrypt.hash(user.password, 10);
  }

  return prismaClient.user.update({
    where: {
      username: user.username,
    },
    data: data,
    select: {
      username: true,
      email: true,
      phoneNumber: true,
      role: true,
    },
  });
};

const logout = async (username) => {
  username = validate(getUserValidation, username);

  const user = await prismaClient.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    throw new ResponseError(404, "User is not found");
  }

  return prismaClient.user.update({
    where: {
      username: username,
    },
    data: {
      token: null,
    },
    select: {
      username: true,
    },
  });
};

const search = async (request) => {
  request = validate(searchUserValidation, request);

  // 1 ((page - 1) * size) = 0
  // 2 ((page - 1) * size) = 10
  const skip = (request.page - 1) * request.size;

  const filters = [];

  if (request.username && request.username.trim() !== "") {
    filters.push({
      username: {
        contains: request.username,
      },
    });
  }

  if (request.email && request.email.trim() !== "") {
    filters.push({
      email: {
        contains: request.email,
      },
    });
  }

  if (request.phoneNumber && request.phoneNumber.trim() !== "") {
    filters.push({
      phoneNumber: {
        contains: request.phoneNumber,
      },
    });
  }

  try {
    const users = await prismaClient.user.findMany({
      where: {
        AND: filters,
      },
      take: request.size,
      skip: skip,
    });

    const totalItems = await prismaClient.user.count({
      where: {
        AND: filters,
      },
    });

    return {
      data: users,
      paging: {
        page: request.page,
        totalItem: totalItems,
        totalPage: Math.ceil(totalItems / request.size),
      },
    };
  } catch (err) {
    console.error("Prisma user search error:", err);
    throw err;
  }
};

export default {
  create,
  login,
  get,
  getById,
  search,
  update,
  logout,
};
