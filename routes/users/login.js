var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  console.log("Post to /users/login");
  res.send("Post request to /users/login.");
});

module.exports = router;
