var express = require("express");
var router = express.Router();

const User = require(global.models + "/User");
const Request = require(global.models + "/Request");


router.get("/", function(req, res, next) {
  "use strict";
  let searchObj = {};
  let filter = req.query.filter;
  let pages;

  let query = {};
  if(filter) {
    query.$text = { $search: filter };
  }
  if(req.query.user) {
    query.userId = { $ne: req.query.user };
  }

  console.log(`req.query.page: ${req.query.page}`);
  let matchCount = Request.count(query, (err, count) => {
    if(err) return res.status(400).send(err);
    pages = Math.ceil(count/20);
  });

  let filteredRequests = Request.find(query)
  .sort({timestamp: 1})
  // .skip(req.query.page ? 20*(req.query.page-1) : 0)
  // .limit(20)
  .populate("bid")
  .populate("user", "username ratings")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    let resObj = {
      data,
      pages
    };
    return res.send(resObj);
  });
});

module.exports = router;
