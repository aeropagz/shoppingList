import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as process from "process";
import * as uuid from "uuid";

import { enviroment } from "../enviroment.js";

import { db } from "../db/index.js";
import { sendEmail } from "./mailer.js";

dotenv.config();

const saltRounds = 1;

custRegister = async function (req, res, next) {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  const reqName = req.body.name;

  const hash = await bcrypt.hash(reqPassword, saltRounds);
  const user = {
    id: uuid.v4(),
    activated: false,
    activateKey: uuid.v4(),
    name: reqName,
    password: hash,
    role: "customer",
    email: reqEmail,
    shoppingLists: [],
  };
  const initLists = {
    userID: user.id,
    lists: [
      {
        listID: uuid.v4(),
        owner: user.id,
        shared: false,
        shop: "SampleShop",
        color: "#d6d6d6",
        items: [
          {
            id: uuid.v4(),
            name: "SampleItem",
            amount: 10,
            done: false,
          },
        ],
      },
    ],
  };
  await db.user.createUser(user, initLists);
  sendEmail({
    from: "simplelist@online.de",
    to: reqEmail,
    subject: "Registration SimpleList",
    html: `<h1>Welcome to SimpleList</h1> <p>Hello ${user.name}, click this <a href="${enviroment.frontUrl}/activate/${user.activateKey}">link</a> to activate your account .</p>`,
  });
  res.json({ result: "success" });
};

const enableUser = async function (req, res, next) {
  const activationKey = req.params.id;

  console.log(activationKey);
  try {
    await db.user.enableUser(activationKey);
    res.json({ result: "succes" });
  } catch (error) {
    res.status(500).json(error);
  }
};

const login = async function (req, res, next) {
  const reqEmail = req.body.username;
  const reqPassword = req.body.password;

  const user = await db.user.findUserByEmail(reqEmail);

  if (
    user &&
    (await bcrypt.compare(reqPassword, user.password)) &&
    user.activated
  ) {
    let errorMessage;

    const jwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    const token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
      expiresIn: "1800s",
    });
    res.json({ id: user.id, name: user.name, role: user.role, token: token });
  } else {
    errorMessage =
      user && !user.activated
        ? "Account is not activated"
        : "Wrong password or username";
    res.status(401).send(errorMessage);
  }
};

module.exports = {
  custRegister,
  login,
  enableUser,
};
