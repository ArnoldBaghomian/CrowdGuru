var express = require("express");
var router = express.Router();

var User = require(global.models + "/User");

router.post("/", User.login, function(req, res, next) {
  "use strict";
  console.log("req.body", req.body);
  res.send(`Hello, ${req.body.username}!`);
});

module.exports = router;
