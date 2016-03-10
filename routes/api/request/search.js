var express = require("express");
var router = express.Router();

const User = require(global.models + "/User");
const Request = require(global.models + "/Request");


router.get("/", User.isLoggedIn, function(req, res, next) {
  "use strict";
  let searchObj = {};
  let filter = req.query.filter;
  let page = Math.floor(req.query.page);
  let filteredRequests = Request.find({
    $text: {
      $search: filter
    }
  })
  .sort({timestamp: -1});

  if(Number.isInteger(page) && page > 1){
    filteredRequests.skip(20*(page-1));
  }

  filteredRequests.limit(20)
  .populate("bid")
  .populate("user", "username ratings")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

module.exports = router;
