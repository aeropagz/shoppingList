const user = require("./user");
const lists = require("./shoppingLists");

module.exports = {
  createUser: user.createUser,
  findUser: user.findUser,
  getShoppingLists: lists.getShoppingLists,
  updateShoppingList: lists.updateShoppingList,
  createNewShoppingList: lists.createNewShoppingList,
};
