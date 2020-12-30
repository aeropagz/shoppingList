let express = require("express");
let router = express.Router();

let user = require("./user");
let lists = require("./lists");


router.use("/user", user);
router.use("/lists", lists);






module.exports = router;