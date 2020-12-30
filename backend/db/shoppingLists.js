let mongoUtil = require("./mongoUtil");

getShoppingLists = async function(userID){
    let db = mongoUtil.getDb();
    if (db) {
        try {
            let lists = await db.collection("lists").findOne({ "userID": userID});
            return lists;
        }
        catch (error) {
            throw error;
        }
    }
    else return ({ "error": "Database not accessible" });
}


module.exports= {
    getShoppingLists
}