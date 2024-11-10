// models/MongoRoutes.js
const mongoose = require("mongoose");

// Define the route schema
const routeSchema = new mongoose.Schema(
  // the object
  {
    routeName: {
      type: String,
      required: [true, "The Route Name is required"],
    },
    routeId: {
      type: String,
      required: [true, "The Route ID is required from Springboot"],
    },
    routeCoordinates: {
      type: Array, // GeoJSON format
      required: [true, "Coordinates are required"],
    },
    totalDistanceKm: {
      type: String, // the distance in km
      required: [true, "Distance is required"],
    },
    lineColor: { type: String, default: "#1bbc9b" }, // Default line color (can be updated)
    lineWidth: { type: Number, default: 8 }, // Default line width (can be updated)
  },

  // timestamp
  {
    timestamps: true,
  }
);

// Create and export the Route model
// the db name will be routes - Which is comming from Route
const MongoRoutes = mongoose.model("Route", routeSchema);

module.exports = MongoRoutes;

// will store this types of data
// {
//   "routeName": "Megenana",
//   "routeCoordinates": [
//     {
//       "latitude": 8.95780381104197,
//       "longitude": 38.76762667944432
//     },
//     {
//       "latitude": 8.95984930460525,
//       "longitude": 38.76785676341604
//     },
//     {
//       "latitude": 8.962349336657722,
//       "longitude": 38.7668213855433
//     },
//     {
//       "latitude": 8.965190261288804,
//       "longitude": 38.766361217599865
//     },
//     {
//       "latitude": 8.96825843492973,
//       "longitude": 38.76647625958572
//     },
//     {
//       "latitude": 8.970644774280215,
//       "longitude": 38.7668213855433
//     },
//     {
//       "latitude": 8.972803829697169,
//       "longitude": 38.76590104965643
//     },
//     {
//       "latitude": 8.974735605233828,
//       "longitude": 38.76544088171298
//     },
//     {
//       "latitude": 8.97655373751895,
//       "longitude": 38.76659130157159
//     },
//     {
//       "latitude": 8.97837186069051,
//       "longitude": 38.769122225260496
//     },
//     {
//       "latitude": 8.979621815083487,
//       "longitude": 38.772113316892856
//     },
//     {
//       "latitude": 8.98098539677958,
//       "longitude": 38.775679618454504
//     },
//     {
//       "latitude": 8.986212412428616,
//       "longitude": 38.789254572785964
//     },
//     {
//       "latitude": 8.988144116522015,
//       "longitude": 38.79190053846074
//     },
//     {
//       "latitude": 8.99189386564787,
//       "longitude": 38.794661546121375
//     },
//     {
//       "latitude": 8.995075440514958,
//       "longitude": 38.796042049951694
//     },
//     {
//       "latitude": 8.999961376034662,
//       "longitude": 38.79834288966888
//     },
//     {
//       "latitude": 9.003370129179746,
//       "longitude": 38.80052868740022
//     },
//     {
//       "latitude": 9.006097108561095,
//       "longitude": 38.80213927520226
//     },
//     {
//       "latitude": 9.009392181200882,
//       "longitude": 38.80374986300429
//     },
//     {
//       "latitude": 9.011891871437793,
//       "longitude": 38.80432507293359
//     },
//     {
//       "latitude": 9.015300512068276,
//       "longitude": 38.80305961108913
//     },
//     {
//       "latitude": 9.018027401408311,
//       "longitude": 38.80225431718811
//     },
//     {
//       "latitude": 9.019390838354804,
//       "longitude": 38.80167910725881
//     }
//   ],
//   "totalDistanceKm": 9.135204320322119
// }
