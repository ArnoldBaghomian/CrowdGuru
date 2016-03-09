var express = require("express");
var router = express.Router();

const User = require("../../../models/User");
const Request = require("../../../models/Request");


router.get("/", User.isLoggedIn, function(req, res, next) {
  "use strict";
  let searchObj = {};
  let filter = req.query.filter;
  Request.find({
    $text: {
      $search: filter
    }
  })
  .populate("bid")
  .populate("user", "username ratings")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

module.exports = router;
