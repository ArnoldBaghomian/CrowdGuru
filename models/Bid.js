'use strict';

var mongoose = require('mongoose');

//big schema that sends to bid object in User schema.
var bidSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  request: { type: mongoose.Schema.Types.ObjectId, ref: "Request" },
  description: {type: String },
  price: { type: Number },
  timeStamp: { type: Date, default: Date.now() }

});


var Bid = mongoose.model('Bid', bidSchema);

module.exports = Bid;
