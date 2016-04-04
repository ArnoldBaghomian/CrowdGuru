(function(){
  "use strict";
  const express = require("express");
  const router  = express.Router();

  const jwt     = require("jwt-simple");

  const Bid     = require(global.models + "/Bid");
  const Request = require(global.models + "/Request");
  const User    = require(global.models + "/User");

  const JWT_SECRET = process.env.JWT_SECRET;

  router.get("/:id", function(req, res, next) {
    let thisUser;
    if(req.cookies.authToken){
      try {
        thisUser = jwt.decode(req.cookies.authToken, JWT_SECRET);
      } catch (err) {

      }
    }
    Request.findById(req.params.id)
    .populate("user", "username ratings")
    .populate("bids")
    .exec((err, request) => {
      if(err) return res.status(400).send(err);
      if(thisUser && thisUser._id != request.user._id){
        console.log("De-populating bids...");
        request.bids.forEach((bidData, i) => {
          request.bids[i] = `Bid ${i+1}`;
        });
        return res.send(request);
      } else {
        console.log("populating bid users");
        Bid.populate(request.bids, { path: "user", model: "User", select: "-password -bids -requests"}, (err, bids) => {
          request.bids = bids;
          return res.send(request);
        });
      }
    });
  });

  module.exports = router;
}());
