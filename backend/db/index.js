const user = require("./user");
const lists = require("./shoppingLists");

module.exports = {
  createUser: user.createUser,
  enableUser: user.enableUser,
  findUserByEmail: user.findUserByEmail,
  findUserByID: user.findUserByID,
  getShoppingLists: lists.getShoppingLists,
  updateShoppingList: lists.updateShoppingList,
  createNewShoppingList: lists.createNewShoppingList,
  deleteList: lists.deleteList,
  getList: lists.getUserByListID,
};
