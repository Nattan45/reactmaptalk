// models/Route.js
const mongoose = require("mongoose");

// Define the route schema
const routeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coordinates: {
    type: Array, // GeoJSON format
    required: true,
  },
});

// Create and export the Route model
const MongoRoutes = mongoose.model("Route", routeSchema);

module.exports = MongoRoutes;
