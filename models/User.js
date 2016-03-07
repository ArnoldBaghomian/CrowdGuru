(function() {
  "use strict";
  const mongoose = require("mongoose");
  const bcrypt   = require("bcrypt");
  const jwt      = require("jwt-simple");

  const JWT_SECRET = process.env.JWT_SECRET;

  // user that takes in rating, request, and user schema input.
  let userSchema = mongoose.Schema({
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    username: { type: String, required: true},
    password: { type: String, required: true },
    email: { type: String, required: true }
  });


  userSchema.statics.login = function(req, res, next) {
    console.log(req.body);
    let userLogin = req.body.email ? { email: req.body.email } : { username: req.body.username };
    let loginType = req.body.email ? "E-Mail" : "Username";
    User.findOne(userLogin, (err, user) => {
      if(err || !user)return res.status(400).send(`No user found with this ${loginType}`);
      console.log(`Found user: ${user}`);
      bcrypt.compare(req.body.password, user.password, (err, correctPass) => {
        if(err) return res.status(400).send(err);
        if(correctPass) {
          //do a jwt-token thing
          console.log(`${user.username} signed in`);

          let authData = {};
          authData.timestamp = Date.now();
          authData.username = user.username;
          authData.email = user.email;
          let authToken = jwt.encode(authData, JWT_SECRET);
          res.cookie("authToken", authToken); // FIXME: This is TOTALLY not the right way to do this, come back and implement jwt-tokens soon.
          next();
        }
        else {
          return res.status(400).send("Incorrect Password.");
        }
      });
    });
  };

  userSchema.statics.register = function(req, res, next) {
    User.findOne({ email: req.body.email }, (err, foundUser) => {
      if(err) return res.status(400).send(err);
      if(foundUser) return res.status(400).send("E-Mail is already in use.");

      User.findOne({ username: req.body.username }, (err, foundUser) => {
        if(err) return res.status(400).send(err);
        if(foundUser) return res.status(400).send("Username is already in use.");

        bcrypt.hash(req.body.password, 14, (err, hash) => {
          var newUser = new User();
          newUser.email = req.body.email;
          newUser.username = req.body.username;
          newUser.password = hash;
          newUser.save((err, savedUser) => {
            if(err) return res.status(400).send(err);
            next();
          });
        });
      });
    });
  };

  userSchema.statics.isLoggedIn = function(req, res, next) {
    console.log(req.cookies.authToken);
    try {
      var decodedToken = jwt.decode(req.cookies.authToken, JWT_SECRET);
    } catch (err) {
      res.cookie("originalUrl", req.originalUrl);
      return res.status(400).redirect("/users/login");
    }
    next();
    // console.log(decodedToken);
  };


  var User = mongoose.model("User", userSchema);

  module.exports = User;
}());
