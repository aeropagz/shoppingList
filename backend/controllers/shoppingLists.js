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
  let error;
  const listID = req.body.list.listID;
  const user = await db.getShoppingLists(req.user.id);
  if (listID) {
    if (listAlreadyExists(user, listID)) {
      error = { message: "List already there" };
    } else {
      list = req.body.list;
      console.log("create new List");
    }
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
  if (!error) {
    await db.createNewShoppingList(list, req.user.id);
    res.json({ result: "ok" });
  } else {
    res.status(409).json(error);
  }
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
  const listCollection = await db.getList(listID);
  const { name, email } = await db.findUserByID(listCollection.userID);

  const list = listCollection.lists.filter((list) => list.listID === listID)[0];

  res.json({ list, owner: { name, email } });
};

function listAlreadyExists(user, listID) {
  const listWithSameID = user.lists.filter((list) => {
    return list.listID === listID;
  });
  if (listWithSameID.length > 0) {
    return true;
  } else {
    return false;
  }
}

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
  deleteList,
  getList,
};
