let express = require("express");
let router = express.Router();

let user = require("../controllers/user");

router.post("/login", user.login);
router.post("/register/customer", user.custRegister);

module.exports = router;