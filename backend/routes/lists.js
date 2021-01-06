const express = require("express");
const router = express.Router();

const lists = require("../controllers/shoppingLists");
const authenticate = require("../middleware/authenticate");

router.get("/", [authenticate.authenticateJWT], lists.getShoppingLists);
router.put("/", [authenticate.authenticateJWT], lists.updateShoppingList);
router.post("/", [authenticate.authenticateJWT], lists.createNewShoppingList);
router.delete("/:id", [authenticate.authenticateJWT], lists.deleteList);
router.get("/:id", [authenticate.authenticateJWT], lists.getList);

module.exports = router;
