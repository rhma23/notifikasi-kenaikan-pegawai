import { prismaClient } from "../application/database.js";

export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    const user = await prismaClient.user.findFirst({
      where: { token },
    });
    if (!user) {
      const error = new Error("Unauthorized");
      error.status = 401;
      throw error;
    }
    req.user = user;
    next();
  } catch (e) {
    next(e);
  }
};
