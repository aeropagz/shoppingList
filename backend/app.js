import express from "express";
import * as bodyParser from "body-parser";
import cors from "cors";

import { router } from "./routes/index.js";
import * as mongoUtil from "./db/mongoUtil.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/", router);

export { app };
