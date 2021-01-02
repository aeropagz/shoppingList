let mongoUtil = require("./mongoUtil");

createUser = async function (userObj, initListsObj) {
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

findUser = async function (email) {
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

getCart = async function (userID) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      let user = await db.collection("users").findOne({ id: userID });
      let cart = user.cart;
      return cart;
    } catch (error) {
      throw error;
    }
  } else return { error: "Database not accessible" };
};

addToCart = async function (userID, cartArr) {
  let db = mongoUtil.getDb();
  if (db) {
    try {
      await db
        .collection("users")
        .updateOne({ id: userID }, { $set: { cart: cartArr } });
      return { result: "success" };
    } catch (error) {
      throw error;
    }
  } else return { error: "Database not accessible" };
};

module.exports = {
  createUser,
  findUser,
  addToCart,
  getCart,
};
