import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as process from "process";
import * as uuid from "uuid";

import { enviroment } from "../enviroment.js";

import { db } from "../db/index.js";
import { sendEmail } from "./mailer.js";
const saltRounds = 1;

const custRegister = async function (req, res, next) {
  const { email, password, name } = req.body;

  const hash = await bcrypt.hash(password, saltRounds);
  const user = {
    id: uuid.v4(),
    activated: false,
    activateKey: uuid.v4(),
    name,
    password: hash,
    role: "customer",
    email,
  };
  const initList = {
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
  await db.user.createUser(user);
  await db.list.createNewShoppingList(user.id, initList);
  sendEmail({
    from: "simplelist@online.de",
    to: email,
    subject: "Registration SimpleList",
    html: `<h1>Welcome to SimpleList</h1> <p>Hello ${user.name}, click this <a href="${enviroment.frontUrl}/activate/${user.activateKey}">link</a> to activate your account .</p>`,
  });
  res.json({ result: "success" });
};

const enableUser = async function (req, res, next) {
  const activationKey = req.params.id;

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
  let errorMessage;

  if (
    user &&
    (await bcrypt.compare(reqPassword, user.password)) &&
    user.activated
  ) {
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

export { custRegister, login, enableUser };
