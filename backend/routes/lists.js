let express = require("express");
let router = express.Router();

let lists = require("../controllers/shoppingLists");
const authenticate = require("../middleware/authenticate");

router.get("/", [authenticate.authenticateJWT], lists.getShoppingLists, []);

module.exports = router;