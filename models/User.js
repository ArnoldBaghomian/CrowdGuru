(function() {
  "use strict";
  const mongoose = require("mongoose");
  const bcrypt   = require("bcrypt");
  const jwt      = require("jwt-simple");
  const mailgun  = require("mailgun-js")({apiKey:process.env.MAILGUN_KEY, domain: process.env.MAILGUN_DOMAIN});

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
          console.log(`${user.username} signed in`);
          let authData = {};
          authData.timestamp = Date.now();
          authData.username = user.username;
          authData.email = user.email;
          authData._id = user._id;
          let authToken = jwt.encode(authData, JWT_SECRET);
          res.cookie("authToken", authToken);
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
    let decodedToken;
    console.log(req.cookies.authToken);
    try {
      decodedToken = jwt.decode(req.cookies.authToken, JWT_SECRET);
    } catch (err) {
      res.cookie("originalUrl", req.originalUrl);
      return res.status(400).redirect("/users/login");
    }
    console.log("Decoded Token:");
    console.log(decodedToken);
    User.findById(decodedToken._id, (err, foundUser) => {
      if(err) return res.status(400).send(err);
      req.user = decodedToken;
      next();
    });
  };

  userSchema.methods.changePassword = function(passwords, cb) {
    console.log("this:", this);
    if(!passwords.newPassword) {
      return cb("Must set new password");
    }
    if(passwords.newPassword != passwords.verifyNewPassword) {
      return cb("Passwords must match");
    }
    bcrypt.compare(passwords.oldPassword, this.password, (err, correctPass) => {
      if(err) return cb(err);
      if(correctPass) {
        bcrypt.hash(passwords.newPassword, 14, (err, hash) => {
          if(err) return cb(err);
          this.password = hash;
          this.save((err, savedThis) => {
            if(err) return cb(err);
            cb(null, "Successfully changed password!");
          });
        });
      }
      else {
        return cb("Incorrect Password");
      }
    });
  };

  userSchema.statics.forgotPassword = function(userInfo, cb) {
    let login = userInfo.login
    let email;
    console.log(userInfo.login);
    console.log(typeof userInfo.login);
    if(userInfo.login.includes("@")) {
      email = userInfo.login;
      sendMessage();
    }
    else {
      console.log(`Finding ${userInfo.login}...`);
      User.findOne({"username": userInfo.login}, (err, foundUser) => {
        if(err) return cb(err);
        console.log(foundUser.email);
        email = foundUser.email;
        sendMessage();
      });
    }

    function sendMessage() {
      let tempPass = (Math.random() * 10000000000000000).toString(16).toUpperCase();
      bcrypt.hash(tempPass, 14, (err, hash) => {
        if(err) return cb(err);
        User.findOne({email: email}, (err, foundUser) => {
          if(err) return cb(err);
          foundUser.password = hash;
          foundUser.save((err, savedUser) => {
            mailgun.messages().send({
              from: "CrowdGuru <crowdguru_support@www.mailgun.org>",
              to: email,
              subject: "Forgotten Password",
              text: `Your password has been reset to ${tempPass}`
            },
            function(err, body){
              if(err) return cb(err);
              cb(null, body);
            });
          });
        });
      });
    }
  };

  var User = mongoose.model("User", userSchema);

  module.exports = User;
}());
