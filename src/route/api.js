import express from "express";
import userController from "../controller/user-controller.js";
import unitController from "../controller/unit-controller.js";
import divisionController from "../controller/division-controller.js";
import branchController from "../controller/branch-controller.js";
import positionController from "../controller/position-controller.js";
import { authMiddleware } from "../middleware/auth-middleware.js";

const userRouter = new express.Router();
userRouter.use(authMiddleware);
// user API
userRouter.get("/api/users/current", userController.get);
userRouter.get("/api/users", userController.search);
userRouter.patch("/api/users/current", userController.update);
userRouter.delete("/api/users/logout", userController.logout);
userRouter.get("/api/users/:userId", userController.getById);

// branch API
userRouter.post("/api/branch", branchController.create);
// userRouter.get("/api/branch", branchController.get);
userRouter.get("/api/branch", branchController.search);
userRouter.get("/api/branch/:branchId", branchController.getById);
userRouter.patch("/api/branch/:branchId", branchController.update);
userRouter.delete("/api/branch/:branchId", branchController.remove);

// unit API
userRouter.post("/api/unit", unitController.create);
// userRouter.get("/api/unit", unitController.get);
userRouter.get("/api/unit", unitController.search);
userRouter.get("/api/unit/:unitId", unitController.getById);
userRouter.patch("/api/unit/:unitId", unitController.update);
userRouter.delete("/api/unit/:unitId", unitController.remove);

// division API
userRouter.post("/api/division", divisionController.create);
// userRouter.get("/api/division", divisionController.get);
userRouter.get("/api/division", divisionController.search);
userRouter.get("/api/division/:divisionId", divisionController.getById);
userRouter.patch("/api/division/:divisionId", divisionController.update);
userRouter.delete("/api/division/:divisionId", divisionController.remove);

// position API
userRouter.post("/api/position", positionController.create);
// userRouter.get("/api/position", positionController.get);
userRouter.get("/api/position", positionController.search);
userRouter.get("/api/position/:positionId", positionController.getById);
userRouter.patch("/api/position/:positionId", positionController.update);
userRouter.delete("/api/position/:positionId", positionController.remove);

// education API
userRouter.post("/api/education", educationController.create);
// userRouter.get("/api/education", educationController.get);
userRouter.get("/api/education", educationController.search);
userRouter.get("/api/education/:educationId", educationController.getById);
userRouter.patch("/api/education/:educationId", educationController.update);
userRouter.delete("/api/education/:educationId", educationController.remove);

export { userRouter };
