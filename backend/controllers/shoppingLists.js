let db = require("../db/index");
let uuid = require("uuid");

getShoppingLists = async function (req, res, next) {
  let userID = req.user.id;
  let lists = await db.getShoppingLists(userID);
  res.json(lists);
};

updateShoppingList = async function (req, res, next) {
  let list = req.body.list;
  await db.updateShoppingList(list);
  res.json({ result: "ok" });
};

createNewShoppingList = async function (req, res, next) {
  let list = {
    listID: uuid.v4(),
    shop: req.body.list.newShop,
    color: req.body.list.newColor,
    items: [
      {
        id: uuid.v4(),
        name: "SampleItem",
        amount: 42,
      },
    ],
  };
  console.log(req.user, list);
  await db.createNewShoppingList(list, req.user.id);
  res.json({ result: "ok" });
};

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
};
