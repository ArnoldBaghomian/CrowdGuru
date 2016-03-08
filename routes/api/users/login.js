var express = require("express");
var router = express.Router();

var User = require("../../../models/User");

router.post("/", User.login, function(req, res, next) {
  "use strict";
    res.send(`Hello, ${req.body.username}!`);
});

module.exports = router;
