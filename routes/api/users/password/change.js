(function(){
  const express = require("express");
  const router = express.Router();

  const User = require(global.models + "/User");

  router.post("/", User.isLoggedIn, (req, res, next) => {
    "use strict";
    User.findById(req.user._id, (err, foundUser) => {
      if(err) return res.status(400).send(err);
      foundUser.changePassword(req.body, (err, message) => {
        if(err) return res.status(400).send(err);
        res.send(message);
      });
    });
  });

  module.exports = router;
}());
