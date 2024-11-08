## MongoDB Integration with Mongoose

This guide explains how to set up MongoDB with Mongoose, including creating a dynamic collection (`VehicleTracking`) and defining schemas and models. It also covers handling multiple databases if needed.

### Connecting to MongoDB

Use Mongoose to connect to a MongoDB database by specifying the connection URL. This example connects to the `VehicleTracking` database, which will automatically be created in MongoDB if it doesn't exist.

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/VehicleTracking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
```

### Defining a Model (Schema)

1. Define a schema for the `Route` model. Mongoose will handle creating a `routes` collection in MongoDB based on this model.

2. Each route document will include properties like `routeName`, `routeCoordinates`, and `totalDistanceKm`.

Example model definition:

```javascript
const mongoose = require("mongoose");

const routeSchema = new mongoose.Schema(
  {
    routeName: {
      type: String,
      required: [true, "The Route Name is required"],
    },
    routeCoordinates: {
      type: Array, // Should be in GeoJSON format for spatial data
      required: [true, "Coordinates are required"],
    },
    totalDistanceKm: {
      type: String,
      required: [true, "Distance is required"],
    },
  },
  { timestamps: true }
);

const MongoRoutes = mongoose.model("Route", routeSchema);
module.exports = MongoRoutes;
```

### Adding Data to MongoDB

Define a method to create and save routes in MongoDB:

```javascript
app.post("/api/create/mongo/createRoute", async (req, res) => {
  try {
    const { routeName, routeCoordinates, totalDistanceKm } = req.body;

    if (!routeName || !routeCoordinates || !totalDistanceKm) {
      return res
        .status(400)
        .json({ message: "Name, coordinates, and distance are required." });
    }

    const route = new MongoRoutes({
      routeName,
      routeCoordinates,
      totalDistanceKm,
    });
    await route.save();

    res.status(201).json({ message: "Route created successfully!", route });
  } catch (error) {
    console.error("Error creating route:", error);
    res.status(500).json({ message: "Error creating route." });
  }
});
```
