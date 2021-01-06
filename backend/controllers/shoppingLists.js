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
  const list = {
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
  await db.createNewShoppingList(list, req.user.id);
  res.json({ result: "ok" });
};

const deleteList = async function (req, res, next) {
  const listID = req.params.id;
  const userID = req.user.id;
  await db.deleteList(listID, userID);
  res.json({ result: "ok" });
};

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
  deleteList,
};
