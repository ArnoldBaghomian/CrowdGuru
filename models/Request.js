'use strict';

var mongoose = require('mongoose');

//Schema goes into the user schema as well as the request object.
var requestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bids: { type: mongoose.Schema.Types.ObjectId, ref: "Bids" },
  title: {type: String },
  description: { type: String },
  skills: { type: Array },
  timeStamp: { type: Date, default: Date.now() }

});


var Request = mongoose.model('Request', requestSchema);

module.exports = Request;
