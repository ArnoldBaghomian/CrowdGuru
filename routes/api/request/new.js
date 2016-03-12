var express = require("express");
var router = express.Router();

const User = require(global.models + "/User");
const Request = require(global.models + "/Request");

router.post("/", User.isLoggedIn, function(req, res, next) {
  "use strict";
  User.findById(req.user._id, (err, foundUser) => {
    let newRequest = new Request();
    newRequest.user = foundUser._id;
    newRequest.userId = foundUser._id;
    newRequest.title = req.body.title;
    newRequest.tags = req.body.tags;
    newRequest.description = req.body.desc;
    foundUser.requests.push(newRequest._id);

    newRequest.save((err, savedRequest) => {
      if(err) return res.status(400).send(err);
      foundUser.save((err, savedUser) => {
        if(err) return res.status(400).send(err);
        res.send(savedRequest);
      });
    });
  });
});

module.exports = router;
