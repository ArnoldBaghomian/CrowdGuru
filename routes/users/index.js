var express = require("express");
var router = express.Router();

router.get("/", function(req, res, next) {
  console.log("Get to /users.");
  res.send("Get to /users.");
});

router.use("/register", require("./register"));

module.exports = router;
