(function(){
  "use strict";
  const mongoose = require("mongoose");
  //Schema goes into the user schema as well as the request object.
  let requestSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    userId: { type: String },
    bids: [{ type: mongoose.Schema.Types.ObjectId, ref: "Bid" }],
    title: {type: String, required: true },
    description: { type: String, required: true },
    tags: [{ type: String, required: true }],
    timestamp: { type: Number, default: Date.now() },
    status: { type: String, default: "open" }
  });

  const Request = mongoose.model("Request", requestSchema);

  module.exports = Request;
}());
