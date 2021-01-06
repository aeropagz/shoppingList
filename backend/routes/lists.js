const express = require("express");
const router = express.Router();

const lists = require("../controllers/shoppingLists");
const authenticate = require("../middleware/authenticate");

router.get("/", [authenticate.authenticateJWT], lists.getShoppingLists);
router.put("/", [authenticate.authenticateJWT], lists.updateShoppingList);
router.post("/", [authenticate.authenticateJWT], lists.createNewShoppingList);

module.exports = router;
