let express = require("express");
let router = express.Router();

let lists = require("../controllers/shoppingLists");
const authenticate = require("../middleware/authenticate");

router.get("/", [authenticate.authenticateJWT], lists.getShoppingLists);
router.put("/", [authenticate.authenticateJWT], lists.updateShoppingList);

module.exports = router;
