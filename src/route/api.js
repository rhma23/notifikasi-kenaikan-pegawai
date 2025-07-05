import express from "express";
import userController from "../controller/user-controller.js";
import unitController from "../controller/unit-controller.js";
import divisionController from "../controller/division-controller.js";
import branchController from "../controller/branch-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
// user API
userRouter.get("/api/users/current", userController.get);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);
// branch API
userRouter.post("/api/branch", branchController.create);
userRouter.get("/api/branch", branchController.get);
userRouter.get("/api/branch/search", branchController.search);
userRouter.get("/api/branch/:branchId", branchController.getById);
userRouter.patch("/api/branch/:branchId", branchController.update);
userRouter.delete("/api/branch/:branchId", branchController.remove);
// unit API
userRouter.post("/api/unit", unitController.create);
userRouter.get("/api/unit", unitController.get);
userRouter.get("/api/unit/:unitId", unitController.getById);
userRouter.patch("/api/unit/:unitId", unitController.update);
userRouter.delete("/api/unit/:unitId", unitController.remove);
// division API
userRouter.post("/api/division", divisionController.create);
userRouter.get("/api/division", divisionController.get);
userRouter.get("/api/division/:divisionId", divisionController.getById);
userRouter.patch("/api/division/:divisionId", divisionController.update);
userRouter.delete("/api/division/:divisionId", divisionController.remove);
export { userRouter };
