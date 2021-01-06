const mongoUtil = require("./mongoUtil");

const getShoppingLists = async function (userID) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      let lists = await db.collection("lists").findOne({ userID: userID });
      return lists;
    } catch (error) {
      throw error;
    }
  } else {
    return { error: "Database not accessible" };
  }
};

const updateShoppingList = async function (list) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      await db
        .collection("lists")
        .updateOne(
          { "lists.listID": list.listID, "lists.listID": list.listID },
          { $set: { "lists.$": list } }
        );
    } catch {
      throw error;
    }
  } else {
    return { error: "Database not accessible" };
  }
};

const createNewShoppingList = async function (list, userID) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      await db
        .collection("lists")
        .updateOne({ userID: userID }, { $addToSet: { lists: list } });
    } catch {
      throw error;
    }
  } else {
    return { error: "Database not accessible" };
  }
};

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
};
