import express from "express";
import userController from "../controller/user-controller.js";
import branchController from "../controller/branch-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
// user API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);
// user API
userRouter.post("/api/branch", branchController.create);
userRouter.get("/api/branch", branchController.get);
export { userRouter };
