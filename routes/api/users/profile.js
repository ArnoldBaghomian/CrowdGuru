(function(){
  "use strict";
  const express = require("express");
  const router = express.Router();
  const User = require(global.models + "/../models/User");
  const Rating = require(global.models + "/../models/Rating");
  const Bid = require(global.models + "/../models/Bid");
  const Request = require(global.models + "/../models/Request");

  router.get("/:userId", (req, res, next) => {
    console.log(`Looking for user: ${req.params.userId}`);
    User.findById(req.params.userId)
    .select("-password -email -__v")
    .populate("ratings bids requests")
    .exec((err, data) => {
      if(err) return res.status(400).send(err);
      console.log(data);
      res.send(data);
    });
  });

  module.exports = router;
}());
