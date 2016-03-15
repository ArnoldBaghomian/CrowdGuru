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
    .exec((err, data) => {
      if(err) return res.status(400).send(err);
      console.log(data);
      res.send(data);
    });
  });

  router.put("/:userId", User.isLoggedIn, (req, res, next) => {

    // console.log("req for aboutme", req);

    User.findById(req.user._id, (err, foundUser) => {
      if(err) return res.status(400).send(err);

      foundUser.aboutMe = req.body.aboutMeText;
      console.log("set foundUser.aboutMe");
      // console.log("I hope it does something: ", foundUser);
      foundUser.save((err, savedUser) => {
        console.log(err);
        if(err) return res.status(400).send(err);

        res.send("it worked?");
      });

    });
  });


  module.exports = router;
}());
