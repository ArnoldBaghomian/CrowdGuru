var express = require("express");
var router = express.Router();

var User = require(global.models + "/User");

router.post("/", User.register, function(req, res, next) {
  "use strict";
  res.send(`Welcome to CrowdGuru, ${req.body.username}!`);
});

module.exports = router;
