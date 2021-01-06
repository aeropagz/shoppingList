const express = require("express");
const router = express.Router();

const user = require("./user");
const lists = require("./lists");


router.use("/user", user);
router.use("/lists", lists);






module.exports = router;