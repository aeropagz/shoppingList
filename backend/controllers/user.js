let bcrypt = require("bcrypt");
let dotenv = require("dotenv");
let jwt = require("jsonwebtoken");
let process = require("process");
let uuid = require("uuid");

let db = require("../db/index");

dotenv.config();

const saltRounds = 1;

custRegister = async function (req, res, next) {
  let reqEmail = req.body.email;
  let reqPassword = req.body.password;
  let reqName = req.body.name;

  let hash = await bcrypt.hash(reqPassword, saltRounds);
  let user = {
    id: uuid.v4(),
    name: reqName,
    password: hash,
    role: "customer",
    email: reqEmail,
    shoppingLists: [],
  };
  let initLists = {
    userID: user.id,
    lists: [
      {
        listID: uuid.v4(),
        shop: "SampleShop",
        items: [
          {
            name: "SampleItem",
            amount: 10,
          },
        ],
      },
    ],
  };

  await db.createUser(user, initLists);
  res.json({ result: "success" });
};

login = async function (req, res, next) {
  let reqEmail = req.body.username;
  let reqPassword = req.body.password;

  let user = await db.findUser(reqEmail);

  if (user && (await bcrypt.compare(reqPassword, user.password))) {
    let jwtPayload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };
    let token = jwt.sign(jwtPayload, process.env.TOKEN_SECRET, {
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
