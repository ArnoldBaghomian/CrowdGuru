'use strict';

var mongoose = require('mongoose');

//Schema for rating that sends to user rating schema 
var ratingSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  Guru: { type: mongoose.Schema.Types.ObjectId, ref: "Guru" },
  category: {type: String },
  score: { type: Number },
  timeStamp: { type: Date, default: Date.now() }

});


var Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;