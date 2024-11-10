const mongoose = require("mongoose");

const checkpointSchema = new mongoose.Schema(
  {
    checkpointId: { type: String, required: true },
    rectangleName: { type: String, required: true },
    lowerLeft: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    upperRight: {
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    area: { type: Number, required: true },

    lineColor: { type: String, default: "#1bbc9b" }, // Default line color (can be updated)
    lineWidth: { type: Number, default: 8 }, // Default line width (can be updated)

    polygonFill: { type: String, default: "#34495e" },
    polygonOpacity: { type: Number, default: 0.4 },

    // If you want to store a reference to a Route, you can add it here
    // route: { type: mongoose.Schema.Types.ObjectId, ref: "Route" },
  },

  // timestamp
  {
    timestamps: true,
  }
);

const MongoCheckpoint = mongoose.model("Checkpoint", checkpointSchema);
module.exports = MongoCheckpoint;
