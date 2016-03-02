'use strict';

var mongoose = require('mongoose');

// user that takes in rating, request, and user schema input.
var userSchema = mongoose.Schema({
  requests: [{ type: mongoose.Schema.Types.ObjectId, ref: "Request" }],
  bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
  ratings: [{ type: mongoose.Schema.Types.ObjectId, ref: "Rating" }],


});


var User = mongoose.model('User', userSchema);

module.exports = User;
