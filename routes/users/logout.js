var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  res.send("Post request to /users/logout.");
});

module.exports = router;
