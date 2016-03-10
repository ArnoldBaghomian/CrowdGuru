var express = require("express");
var router = express.Router();

router.use("/changePassword", require("./changePassword"));
router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));

module.exports = router;
