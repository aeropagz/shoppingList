import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";

import * as router from "./routes/index.js";
import * as mongoUtil from "./db/mongoUtil.js";

const { urlencoded, json } = bodyParser;

const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());

mongoUtil.connectToServer();

app.use("/", router);

export { app };
