var express = require("express");
var router = express.Router();

router.use("/password", require("./password"));
router.use("/profile", require("./profile"));
router.use("/register", require("./register"));
router.use("/login", require("./login"));


module.exports = router;
