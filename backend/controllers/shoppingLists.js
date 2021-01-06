const db = require("../db/index");
const uuid = require("uuid");

const getShoppingLists = async function (req, res, next) {
  const userID = req.user.id;
  let lists = await db.getShoppingLists(userID);
  res.json(lists);
};

const updateShoppingList = async function (req, res, next) {
  const list = req.body.list;
  await db.updateShoppingList(list);
  res.json({ result: "ok" });
};

const createNewShoppingList = async function (req, res, next) {
  let list;
  if (req.body.list.listID) {
    list = req.body.list;
  } else {
    list = {
      listID: uuid.v4(),
      shop: req.body.list.newShop,
      color: req.body.list.newColor,
      items: [
        {
          id: uuid.v4(),
          name: "SampleItem",
          amount: 42,
          done: false,
        },
      ],
    };
  }
  await db.createNewShoppingList(list, req.user.id);
  res.json({ result: "ok" });
};

const deleteList = async function (req, res, next) {
  const listID = req.params.id;
  const userID = req.user.id;
  await db.deleteList(listID, userID);
  res.json({ result: "ok" });
};

const getList = async function (req, res, next) {
  const listID = Buffer.from(
    decodeURIComponent(req.params.id),
    "base64"
  ).toString();
  console.log(listID);
  const listCollection = await db.getList(listID);
  const { name, email } = await db.findUserByID(listCollection.userID);

  const list = listCollection.lists.filter((list) => list.listID === listID)[0];

  res.json({ list, owner: { name, email } });
};

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
  deleteList,
  getList,
};
