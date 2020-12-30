let db = require("../db/index");


getShoppingLists = async function(req, res, next){
    let userID = req.user.id;
    let lists = await db.getShoppingLists(userID);
    res.json(lists);
}

module.exports = {
    getShoppingLists
}