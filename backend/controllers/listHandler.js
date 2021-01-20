import { db } from "../db/index.js";
import * as uuid from "uuid";

const getShoppingLists = async function (req, res, next) {
  const userID = req.user.id;
  let lists = await db.list.getShoppingListsByUserID(userID);
  res.json(lists);
};

const updateShoppingList = async function (req, res, next) {
  const list = req.body.list;
  console.log(list);
  let result = await db.list.updateShoppingList(list);
  console.log(result);
  res.json({ result: "ok" });
};

const createNewShoppingList = async function (req, res, next) {
  let list;
  let error;
  const listID = req.body.list.listID;

  if (listID) {
    const user = await db.list.getShoppingListsByUserID(req.user.id);
    if (listAlreadyExists(user, listID)) {
      error = { message: "List already there" };
    } else {
      list = req.body.list;
    }
  } else {
    list = {
      listID: uuid.v4(),
      shop: req.body.list.newShop,
      owner: req.user.id,
      shared: false,
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
    await db.list.createNewShoppingList(list, req.user.id);
    res.json({ result: "ok" });
  } else {
    res.status(409).json(error);
  }
};

const deleteList = async function (req, res, next) {
  const listID = req.params.id;
  const userID = req.user.id;
  await db.list.deleteList(listID, userID);
  res.json({ result: "ok" });
};

const getList = async function (req, res, next) {
  const listID = Buffer.from(
    decodeURIComponent(req.params.id),
    "base64"
  ).toString();
  const listCollection = await db.list.getList(listID);
  const { name, email } = await db.user.findUserByID(listCollection.userID);

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

export {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
  deleteList,
  getList,
};
