const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const process = require("process");
const uuid = require("uuid");

const db = require("../db/index");

dotenv.config();

const saltRounds = 1;

custRegister = async function (req, res, next) {
  const reqEmail = req.body.email;
  const reqPassword = req.body.password;
  const reqName = req.body.name;

  const hash = await bcrypt.hash(reqPassword, saltRounds);
  const user = {
    id: uuid.v4(),
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

  await db.createUser(user, initLists);
  res.json({ result: "success" });
};

login = async function (req, res, next) {
  const reqEmail = req.body.username;
  const reqPassword = req.body.password;

  const user = await db.findUserByEmail(reqEmail);

  if (user && (await bcrypt.compare(reqPassword, user.password))) {
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
    res.status(401).send("Wrong password or username");
  }
};

module.exports = {
  custRegister,
  login,
};
