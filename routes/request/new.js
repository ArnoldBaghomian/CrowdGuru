var express = require("express");
var router = express.Router();

const User = require("../../models/User");

router.post("/", User.isLoggedIn, function(req, res, next) {
  "use strict";
  let resObj = {
    id: Math.floor(Math.random() * 1000000000000).toString(16),
    text: "Post to /request/new"
  };
  res.send(resObj);
});

module.exports = router;
