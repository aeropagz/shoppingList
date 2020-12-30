let user = require("./user");
let lists = require("./shoppingLists");


module.exports = {
    createUser: user.createUser,
    findUser: user.findUser,
    getShoppingLists: lists.getShoppingLists
};