let db = require("../db/index");

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

module.exports = {
  getShoppingLists,
  updateShoppingList,
};
