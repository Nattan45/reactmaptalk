const mongoose = require("mongoose");

const MongoCheckpoint = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
});

// the db name will be checkpoints - Which is comming from Checkpoint
module.exports = mongoose.model("Checkpoint", MongoCheckpoint);
