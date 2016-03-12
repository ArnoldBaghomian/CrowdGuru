var express = require("express");
var router = express.Router();

router.use("/bid", require("./bid"));
router.use("/request", require("./request"));
router.use("/users", require("./users"));

module.exports = router;
