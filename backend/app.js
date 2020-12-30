const express = require("express");
const bodyParser = require("body-parser");
let cors = require("cors");
let cookieParser = require('cookie-parser');

let router = require("./routes/index");
let mongoUtil = require("./db/mongoUtil");

const { urlencoded, json } = bodyParser;


const app = express();

app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

mongoUtil.connectToServer();

app.use(express.static(__dirname + "/public"));

app.use("/", router);

module.exports = app;