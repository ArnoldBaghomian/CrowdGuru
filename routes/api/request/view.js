var express = require("express");
var router = express.Router();

const User = require(global.models + "/User");
const Request = require(global.models  + "/Request");

router.get("/:id", User.isLoggedIn, function(req, res, next) {
  Request.findById(req.params.id)
  .populate("bid")
  .populate("user", "username ratings")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

module.exports = router;
