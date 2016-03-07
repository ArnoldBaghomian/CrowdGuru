(function(){
  "use strict";
  const mongoose = require("mongoose");
  //Schema goes into the user schema as well as the request object.
  let requestSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bids: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
    title: {type: String, required: true },
    description: { type: String, required: true },
    tags: { type: Array, required: true },
    timestamp: { type: Date, default: Date.now() }
  });


  const Request = mongoose.model("Request", requestSchema);

  module.exports = Request;
}());
