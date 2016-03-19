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
    .exec((err, data) => {
      if(err) return res.status(400).send(err);
      if(thisUser._id != data.user._id){
        console.log("De-populating bids...");
        data.bids.forEach((bidData, i) => {
          data.bids[i] = `Bid ${i+1}`;
        });
      }
      res.send(data);
    });
  });

  module.exports = router;
}());
