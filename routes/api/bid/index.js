var express = require("express");
var router = express.Router();

router.use("/new", require("./new"));

module.exports = router;
