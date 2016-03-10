(function(){
  const express = require("express");
  const router = express.Router();

  const User = require(global.models + "/User");

  router.post("/", (req, res, next) => {
    "use strict";
    // res.send("Post to /api/users/password/forgot");
    User.forgotPassword(req.body, (err, message) => {
      if(err) return res.status(400).send(err);
      res.send(message);
    });
  });

  module.exports = router;
}());
