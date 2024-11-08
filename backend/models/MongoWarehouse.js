const mongoose = require("mongoose");

const MongoWarehouse = new mongoose.Schema({
  name: { type: String, required: true },
  location: {
    latitude: Number,
    longitude: Number,
  },
  storageCapacity: Number,
});

// the db name will be warehouses - Which is comming from Warehouse
module.exports = mongoose.model("Warehouse", MongoWarehouse);
