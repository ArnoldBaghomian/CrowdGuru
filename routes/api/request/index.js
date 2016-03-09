var express = require("express");
var router = express.Router();

router.use("/new", require("./new"));
router.use("/search", require("./search"));
router.use("/view", require("./view"));

module.exports = router;
