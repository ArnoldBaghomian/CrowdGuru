const mongoose = require("mongoose");

//Schema goes into the user schema as well as the request object.
let requestSchema = mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bids: { type: mongoose.Schema.Types.ObjectId, ref: "Bid" },
  title: {type: String },
  description: { type: String },
  skills: { type: Array },
  timeStamp: { type: Date, default: Date.now() }

});


const Request = mongoose.model("Request", requestSchema);

module.exports = Request;
