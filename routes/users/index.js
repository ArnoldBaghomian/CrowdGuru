var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  res.send("You found an easter egg, though not a very exciting one.");
});

router.use("/register", require("./register"));
router.use("/login", require("./login"));
router.use("/logout", require("./logout"));

module.exports = router;
