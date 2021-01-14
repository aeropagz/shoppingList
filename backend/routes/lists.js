import express from "express";
const listRouter = express.Router();

import * as lists from "../controllers/listHandler.js";
import { authenticateJWT } from "../middleware/authenticate.js";

listRouter.get("/", [authenticateJWT], lists.getShoppingLists);
listRouter.put("/", [authenticateJWT], lists.updateShoppingList);
listRouter.post("/", [authenticateJWT], lists.createNewShoppingList);
listRouter.delete("/:id", [authenticateJWT], lists.deleteList);
listRouter.get("/:id", [authenticateJWT], lists.getList);
export { listRouter };
