var express = require("express");
var router = express.Router();

router.use("/view", require("./view"));

module.exports = router;
