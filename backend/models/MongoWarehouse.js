const mongoose = require("mongoose");

// Define the WarehouseCoordinate schema
const WarehouseCoordinateSchema = new mongoose.Schema(
  {
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
  },
  {
    _id: false, // We don't need an `_id` for each coordinate
  }
);

// Define the main Warehouse schema
const warehouseSchema = new mongoose.Schema(
  {
    warehouseId: { type: String, required: true },
    warehouseName: { type: String, required: true },
    warehouseCoordinates: { type: [WarehouseCoordinateSchema], required: true },

    side: { type: Number, required: true },
    area: { type: Number, required: true },
    unit: { type: String, required: true },

    lineColor: { type: String, default: "#1bbc9b" }, // Default line color (can be updated)
    lineWidth: { type: Number, default: 8 }, // Default line width (can be updated)

    polygonFill: { type: String, default: "#34495e" },
    polygonOpacity: { type: Number, default: 0.4 },
  },
  {
    timestamps: true, // Will add `createdAt` and `updatedAt` fields automatically
  }
);

// Create the Warehouse model
const MongoWarehouse = mongoose.model("Warehouse", warehouseSchema);

module.exports = MongoWarehouse;
