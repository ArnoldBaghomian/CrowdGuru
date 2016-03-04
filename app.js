(function(){
  "use strict";
  const bodyParser    = require("body-parser");
  const chalk         = require("chalk");
  const cookieParser  = require("cookie-parser");
  const express       = require("express");
  const logger        = require("morgan");
  const path          = require("path");
  // const favicon = require("serve-favicon");

  const app = express();

  const mongoose = require("mongoose");
  const mongoUrl = process.env.MONGOLAB_URI || "mongodb://localhost/CrowdGuru";
  mongoose.connect(mongoUrl, function(err) {
    console.log(err || `${chalk.blue.bold("Connected to MongoDB:")} ${chalk.cyan.bold(mongoUrl)}`);
  });

  // view engine setup
  app.set("views", path.join(__dirname, "views"));
  app.set("view engine", "ejs");

  //app.use(favicon(path.join(__dirname, "public", "favicon.ico")));
  app.use(logger("dev"));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use(express.static(path.join(__dirname, "public")));

  app.use("/users", require("./routes/users"));
  app.all("/*", function(req, res, next) {
    res.render("index", { title: "CrowdGuru" });
  });

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
  });

  // error handlers

  // development error handler
  // will print stacktrace
  if (app.get("env") === "development") {
    app.use(function(err, req, res, next) {
      res.status(err.status || 500);
      res.render("error", {
        message: err.message,
        error: err
      });
    });
  }

  // production error handler
  // no stacktraces leaked to user
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render("error", {
      message: err.message,
      error: {}
    });
  });


  module.exports = app;
}());
