let mongoUtil = require("./mongoUtil");

const createUser = async function (userObj, initListsObj) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      await db.collection("users").insertOne(userObj);
      await db.collection("lists").insertOne(initListsObj);
    } catch (error) {
      throw error;
    }
  } else return { error: "Database not accessible" };
};

const findUserByEmail = async function (email) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      let user = await db.collection("users").findOne({ email: email });
      return user;
    } catch (error) {
      throw error;
    }
  } else return { error: "Database not accessible" };
};
const findUserByID = async function (userID) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      let user = await db.collection("users").findOne({ id: userID });
      return user;
    } catch (error) {
      throw error;
    }
  } else return { error: "Database not accessible" };
};

module.exports = {
  createUser,
  findUserByEmail,
  findUserByID,
};
