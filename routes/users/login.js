var express = require("express");
var router = express.Router();

router.post("/", function(req, res, next) {
  console.log("Post to /users/register");
  res.send("Post request to /users/register.");
});

module.exports = router;
