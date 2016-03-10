var express = require("express");
var router = express.Router();

// router.use("/change", require("./change"));
router.use("/forgot", require("./forgot"));

module.exports = router;
