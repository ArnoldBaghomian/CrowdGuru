var express = require("express");
var router = express.Router();

const Bid = require(global.models  + "/Bid");
const Request = require(global.models  + "/Request");
const User = require(global.models + "/User");

router.get("/:id", function(req, res, next) {
  Request.findById(req.params.id)
  .populate("bids")
  .populate("user", "username ratings")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

module.exports = router;
