import express from "express";
import userController from "../controller/user-controller.js";

const publicRouter = new express.Router();
publicRouter.post("/api/users/create", userController.create);
publicRouter.post("/api/users/login", userController.login);
publicRouter.post("/api/users/logout", userController.logout);
export { publicRouter };
