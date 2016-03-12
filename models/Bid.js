(function(){
  "use strict";
  const mongoose = require("mongoose");

  //big schema that sends to bid object in User schema.
  let bidSchema = mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    request: { type: mongoose.Schema.Types.ObjectId, ref: "Request", required: true },
    description: {type: String, required: true },
    title: { type: String, required: true },
    timeStamp: { type: Date, default: Date.now() }
  });


  const Bid = mongoose.model("Bid", bidSchema);

  module.exports = Bid;
}());
