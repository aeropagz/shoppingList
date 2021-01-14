import * as express from "express";
const listRouter = express.Router();

const lists = require("../controllers/listHandler");
const authenticate = require("../middleware/authenticate");

listRouter.get("/", [authenticate.authenticateJWT], lists.getShoppingLists);
listRouter.put("/", [authenticate.authenticateJWT], lists.updateShoppingList);
listRouter.post(
  "/",
  [authenticate.authenticateJWT],
  lists.createNewShoppingList
);
listRouter.delete("/:id", [authenticate.authenticateJWT], lists.deleteList);
listRouter.get("/:id", [authenticate.authenticateJWT], lists.getList);
export { listRouter };
