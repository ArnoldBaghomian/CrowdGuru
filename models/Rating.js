(function(){
  "use strict";
  const mongoose = require("mongoose");

  //Schema for rating that sends to user rating schema
  let ratingSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    guru: { type: mongoose.Schema.Types.ObjectId, ref: "Guru" },
    category: {type: String },
    score: { type: Number },
    timeStamp: { type: Date, default: Date.now() }

  });


  const Rating = mongoose.model("Rating", ratingSchema);

  module.exports = Rating;
}());
