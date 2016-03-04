(function() {
  "use strict";
  const mongoose = require("mongoose");
  const bcrypt   = require("bcrypt");

  // user that takes in rating, request, and user schema input.
  let userSchema = mongoose.Schema({
    requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],
    username: { type: String },
    password: { type: String },
    email: { type: String }
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
          res.cookie("authToken", user.username); // FIXME: This is TOTALLY not the right way to do this, come back and implement jwt-tokens soon.
          next();
        }
        else {
          return res.status(400).send("Incorrect Password.");
        }
      });
    });
  };

  userSchema.statics.register = function(req, res, next) {
    console.log("register userData:", req.body);
    bcrypt.hash(req.body.password, 14, (err, hash) => {
      console.log(`Hashed password ${hash}`);
      var newUser = new User();
      newUser.email = req.body.email;
      newUser.username = req.body.username;
      newUser.password = hash;
      newUser.save((err, savedUser) => {
        if(err) return res.status(400).send(err);
        console.log(`Saved user:`, savedUser);
        next();
      });
    });
  };


  var User = mongoose.model("User", userSchema);

  module.exports = User;
}());
