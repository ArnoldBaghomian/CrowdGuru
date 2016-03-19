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
    .select("-password -__v")
    .populate("ratings bids requests")
    .exec((err, user) => {
      if(err) return res.status(400).send(err);
      User.populate(user, { path: "bids.request", model: "Request", select: "title _id" }, (err, user) => {
        if(err) return res.status(400).send(err);
        console.log("user", user);
        res.send(user);
      });
    });
  });

  router.put("/:userId", User.isLoggedIn, (req, res, next) => {
    console.log("put request begins");
    console.log(req.body.userId);
    console.log(req.user._id);
    if(req.body.userId != req.user._id){
      return res.status(400).send("You may only update your own status");
    }
    console.log("User is not updating another user's status");
    User.findById(req.body.userId, (err, foundUser) => {
      if(err) return res.status(400).send(err);
      console.log("Found user");
      foundUser.aboutMe = req.body.aboutMeText;
      foundUser.save((err, savedUser) => {
        if(err) return res.status(400).send(err);
        console.log("saved user");
        res.send("Status updated.");
      });
    });
  });


  module.exports = router;
}());
