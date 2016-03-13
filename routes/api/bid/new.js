(function(){
  "use strict";
  const express = require("express");
  const router = express.Router();

  const Bid = require(global.models + "/Bid");
  const Request = require(global.models + "/Request");
  const User = require(global.models + "/User");

  router.post("/", User.isLoggedIn, (req, res, next) => {
    let newBid = new Bid();
    Bid.findOne({ $and: [
      { user: req.user._id },
      { request: req.body.requestId }
    ]})
    .populate("user")
    .exec((err, bid) => {
      if(err) return res.status(400).send(err);
      console.log("Bid:", bid);
      if(bid) return res.status(400).send("You already have an active bid on this request.");
      Request.findOne({ _id: req.body.requestId}).exec((err, request) => {
        if(err) return res.status(400).send(err);
        if(request.user === req.body.user) return res.status(400).send("You may not bid on your own request.");
        newBid.user = req.user._id;
        newBid.request = req.body.requestId;
        newBid.title = req.body.title;
        newBid.description = req.body.desc;
        User.findOne(req.user._id).exec((err, foundUser) => {
          if(err) return res.status(400).send(err);
          newBid.save((err, savedBid) => {
            if(err) return res.status(400).send(err);
            request.bids.push(savedBid);
            request.save(err => {
              if(err) return res.status(400).send(err);
              foundUser.bids.push(savedBid);
              foundUser.save(err => {
                if(err) return res.status(400).send(err);
                res.send(savedBid);
              });
            });
          });
        });
      });
    });
  });

  module.exports = router;
}());
