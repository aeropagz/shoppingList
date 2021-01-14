import express from "express";

const router = express.Router();

import { userRouter } from "./user.js";
import { listRouter } from "./lists.js";

router.use("/user", userRouter);
router.use("/lists", listRouter);

export { router };
