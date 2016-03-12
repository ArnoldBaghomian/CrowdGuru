(function(){
  "use strict";
  const express = require("express");
  const router = express.Router();

  const Bid = require(global.models + "/Bid");
  const Request = require(global.models + "/Request");
  const User = require(global.models + "/User");

  router.post("/", User.isLoggedIn, (req, res, next) => {
    let newBid = new Bid();
    Bid.findOne({
      user: req.user._id,
      request: req.body.requestId
    }).exec((err, bid) => {
      if(err) return res.status(400).send(err);
      console.log("Bid:", bid);
      if(bid) return res.status(400).send("You already have an active bid on this request.");
      Request.findOne({ _id: req.body.requestId, user: req.user._id}).exec((err, request) => {
        if(err) return res.status(400).send(err);
        if(request) return res.status(400).send("You may not bid on your own request.");
        newBid.user = req.user._id;
        newBid.userId = req.user._id;
        newBid.request = req.body.requestId;
        newBid.requestId = req.body.requestId;
        newBid.title = req.body.title;
        newBid.description = req.body.desc;
        newBid.save((err, savedBid) => {
          if(err) return res.status(400).send(err);
          res.send(savedBid);
        });
      });
    });
  });

  module.exports = router;
}());
