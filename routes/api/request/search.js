const chalk   = require("chalk");
const moment  = require("moment");

const User    = require(global.models + "/User");
const Request = require(global.models + "/Request");

const express = require("express");
const router  = express.Router();

router.get("/", function(req, res, next) {
  "use strict";
  let searchObj = {};
  let filter = req.query.filter;
  let pages;

  let query = {
    status: "Open"
  };
  if(filter) {
    query.$text = { $search: filter };
  }
  if(req.query.user) {
    query.userId = { $ne: req.query.user };
  }

  let expiredTimestamp = +(moment().subtract(3, "d").format("x")); //marks "Open" requests as retired if 3 days have passed since their creation
  Request.find({
    timestamp: { $lte: expiredTimestamp },
    status: "Open"
  })
  .populate("request")
  .exec((err, requests) => {
    if(err) return res.status(400).send(err);
    if(requests) {
      console.log(chalk.yellow(`There are ${requests.length} requests to be expired.`));
    }
    requests.forEach((request) => {
      request.status = "Expired";
      request.save((err, expiredRequest) => {
        console.log(chalk.blue(`Expired Request: ${expiredRequest}`));
        if(err) return res.status(400).send(err);
      });
    });
  });

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
