var express = require("express");
var router = express.Router();

const User = require("../../../models/User");
const Request = require("../../../models/Request");

router.get("/:id", User.isLoggedIn, function(req, res, next) {
  Request.findById(req.params.id)
  .populate("bid user")
  .exec((err, data) => {
    if(err) return res.status(400).send(err);
    res.send(data);
  });
});

module.exports = router;
