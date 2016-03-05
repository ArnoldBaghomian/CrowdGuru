var express = require("express");
var router = express.Router();

const User = require("../../models/User");

// router.get("/", User.isLoggedIn, function(req, res, next) {
//   res.send("/request/new is working");
// });

router.post("/", User.isLoggedIn, function(req, res, next) {
  "use strict";
  res.send("Post to /request/new");
});

module.exports = router;
