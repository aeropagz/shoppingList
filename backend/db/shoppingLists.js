const mongoUtil = require("./mongoUtil");

const getShoppingLists = async function (userID) {
  const db = mongoUtil.getDb();
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
  const db = mongoUtil.getDb();
  if (db) {
    try {
      await db
        .collection("lists")
        .updateMany(
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
  const db = mongoUtil.getDb();
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

const deleteList = async function (listID, userID) {
  const db = mongoUtil.getDb();
  if (db) {
    try {
      await db
        .collection("lists")
        .updateOne(
          { userID: userID },
          { $pull: { lists: { listID: listID } } }
        );
    } catch {
      throw error;
    }
  }
};

const getList = async function (givenID) {
  const db = mongoUtil.getDb();
  if (db) {
    try {
      const user = await db
        .collection("lists")
        .findOne({ "lists.listID": givenID });
      return user;
    } catch (error) {
      throw error;
    }
  }
};

module.exports = {
  getShoppingLists,
  updateShoppingList,
  createNewShoppingList,
  deleteList,
  getList,
};
