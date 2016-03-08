var express = require("express");
var router = express.Router();

router.use("/request", require("./request"));

module.exports = router;
