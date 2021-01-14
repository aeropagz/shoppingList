import express from "express";

const userRouter = express.Router();

import * as userHandler from "../controllers/userHandler.js";

userRouter.post("/login", userHandler.login);
userRouter.post("/register/customer", userHandler.custRegister);
userRouter.get("/activate/:id", userHandler.enableUser);

export { userRouter };
