const mongoose = require("mongoose");

const MongoPin = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  location: {
    latitude: Number,
    longitude: Number,
  },
  type: { type: String, enum: ["route", "checkpoint", "warehouse"] },
});

// the db name will be pins - Which is comming from Pin
module.exports = mongoose.model("Pin", MongoPin);
