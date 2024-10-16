require("dotenv").config();
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
const axios = require("axios"); // npm i axios
const bodyParser = require("body-parser");

const routes = require("./routes"); // Import routes

// Frontend validators
const validateUserData = require("./validators/userAccounts/accountValidator");
const validateDriverProfile = require("./validators/driverProfiles/driverProfile");
const validateVehicleRegistration = require("./validators/vehicleProfile/vehicleRegistration");

const validateRfidRegistration = require("./validators/rfidKeyProfile/rfidRegistration");

// backend validators
// const { healthCheckMiddleware, checkBackendHealth, startPeriodicHealthCheck } = require("./validators/endpintHealth/healthCheckMiddleware");

const app = express();
// Enable CORS to allow requests from the React frontend
app.use(cors());
// Apply health check middleware globally

// app.use(cors({ origin: "http://192.168.200.182:48624" }));
// For parsing JSON bodies
app.use(bodyParser.json());
// Custom port from env file
const PORT = process.env.Node_PORT;
// Get Spring Boot endpoint from the .env file
const SPRING_ENDPOINT = process.env.SPRING_ENDPOINT;

// User Account Related Endpoints ________________________________________________
// get all users list
app.get("/api/users", async (req, res) => {
  try {
    // Make a request to your Spring Boot user endpoint
    const response = await axios.get(`${SPRING_ENDPOINT}${routes.USERSLIST}`);

    // console.log(response.data);
    // Send back the user data to the frontend
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// get all users list - with id
app.get("/api/users-id", async (req, res) => {
  try {
    const response = await axios.get(`${SPRING_ENDPOINT}${routes.USERLISTID}`);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// get all users list - For update
app.get("/api/users-id-list", async (req, res) => {
  try {
    const response = await axios.get(`${SPRING_ENDPOINT}${routes.USERSIDLIST}`);

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

// create new user
app.post("/api/create/user", async (req, res) => {
  const userData = req.body;

  // Validate the data coming from the frontend
  const validationErrors = validateUserData(userData);
  if (validationErrors) {
    return res.status(400).json({
      errorMessage: validationErrors.join(", "), // Return all validation errors as a single string
    });
  }

  try {
    const response = await axios.post(
      `${SPRING_ENDPOINT}${routes.USERSIGNUP}`,
      userData
    );
    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      // If the error comes from Spring Boot, forward the error message to React
      console.log("Response from Spring service:", error.response.data);

      // Format the error response to match the desired structure
      const errorMessage = error.response.data.errorMessage || "Unknown error"; // Fallback in case the key doesn't exist
      res.status(error.response.status).json({ errorMessage });
    } else {
      // Handle any other server errors
      console.log("Error:", error.message); // Log the error message
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// update user details
app.put("/api/users-update/:id", async (req, res) => {
  const userId = req.params.id;

  const userData = req.body;
  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    const response = await axios.put(
      `${SPRING_ENDPOINT}${routes.USERSLIST}/${userId}`,
      userData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send success response back to the client
    res.status(response.status).json({ message: "User updated successfully" });
  } catch (error) {
    // Handle errors from the Spring service
    if (error.response) {
      console.error("Error from Spring service:--", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.message || "Failed to Update user",
      });
    } else {
      console.error("Server error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// delete User Account
app.delete("/api/user/remove/:id", async (req, res) => {
  const userId = req.params.id;

  if (!userId) {
    return res.status(400).json({ error: "User ID is required" });
  }

  try {
    // Send DELETE request to Spring Boot service to delete the user
    const response = await axios.delete(
      `${SPRING_ENDPOINT}${routes.DELETEUSERS}/${userId}`
    );

    // Send success response back to the client
    res.status(response.status).json({ message: "User deleted successfully" });
  } catch (error) {
    // Handle errors from the Spring service
    if (error.response) {
      console.error("Error from Spring service:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.message || "Failed to delete user",
      });
    } else {
      console.error("Server error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Driver Related Endpoints ________________________________________________
//get all drivers with ID
app.get("/api/drivers-id-list", async (req, res) => {
  try {
    const response = await axios.get(
      `${SPRING_ENDPOINT}${routes.DRIVERSIDLIST}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching drivers:", error.message);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
});

//get all drivers
app.get("/api/drivers", async (req, res) => {
  try {
    const response = await axios.get(`${SPRING_ENDPOINT}${routes.DRIVERSLIST}`);

    res.json(response.data);
    // console.log(response.data);
  } catch (error) {
    console.error("Error fetching drivers:", error.message);
    res.status(500).json({ error: "Failed to fetch drivers" });
  }
});

// update Driver
app.put("/api/update/driver/:id", async (req, res) => {
  const driverId = req.params.id;
  const driverData = req.body;

  if (!driverId) {
    return res.status(400).json({ error: "Driver ID is required" });
  }

  try {
    const response = await axios.put(
      `${SPRING_ENDPOINT}${routes.DRIVERSLIST}/${driverId}`,
      driverData,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send success response back to the client
    res
      .status(response.status)
      .json({ message: "Driver updated successfully" });
  } catch (error) {
    // Handle errors from the Spring service
    if (error.response) {
      console.error("Error from Spring service:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.message || "Failed to Update user",
      });
    } else {
      console.error("Server error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// Create Driver
app.post("/api/create/driver", async (req, res) => {
  const userData = req.body;
  // console.log(userData, "driver data");

  // Validate the data coming from the frontend
  const validationErrors = validateDriverProfile(userData);
  if (validationErrors) {
    return res.status(400).json({
      errorMessage: validationErrors.join(", "),
    });
  }

  try {
    const response = await axios.post(
      `${SPRING_ENDPOINT}${routes.DRIVERSLIST}`,
      userData
    );
    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      console.log("Response from Spring service:", error.response.data);

      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// delete Driver
app.delete("/api/delete/driver/:id", async (req, res) => {
  const driverId = req.params.id;

  try {
    const response = await axios.delete(
      `${SPRING_ENDPOINT}${routes.DRIVERSLIST}/${driverId}`
    );

    res
      .status(response.status)
      .json({ message: "Driver deleted successfully" });
  } catch (error) {
    if (error.response) {
      console.log("Response from Spring service:", error.response.data);

      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Vehicle Related Endpoints ________________________________________________
//get all vehicles with ID
app.get("/api/vehicles-id-list", async (req, res) => {
  try {
    const response = await axios.get(
      `${SPRING_ENDPOINT}${routes.VEHICLESIDLIST}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

//get all vehicles
app.get("/api/vehicles", async (req, res) => {
  try {
    const response = await axios.get(
      `${SPRING_ENDPOINT}${routes.VEHICLESLIST}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching vehicles:", error.message);
    res.status(500).json({ error: "Failed to fetch vehicles" });
  }
});

// create vehicles
app.post("/api/create/vehicle", async (req, res) => {
  const vehicleData = req.body;

  // Validate the data coming from the frontend
  const validationErrors = validateVehicleRegistration(vehicleData);
  if (validationErrors) {
    return res.status(400).json({
      errorMessage: validationErrors.join(", "),
    });
  }

  try {
    const response = await axios.post(
      `${SPRING_ENDPOINT}${routes.VEHICLESLIST}`,
      vehicleData
    );
    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      console.log("Response from Spring service:", error.response.data);

      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// update vehicles
app.put("/api/update/vehicle/:id", async (req, res) => {
  const vehicleId = req.params.id;

  const vehicleDetail = req.body;

  if (!vehicleId) {
    return res.status(400).json({ error: "Vehicle ID is required" });
  }

  try {
    const response = await axios.put(
      `${SPRING_ENDPOINT}${routes.VEHICLEUPDATE.replace(":id", vehicleId)}`, // Inject the vehicleId into the URL
      vehicleDetail,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    // Send success response back to the client
    res
      .status(response.status)
      .json({ message: "Vehicle updated successfully" });
  } catch (error) {
    // Handle errors from the Spring service
    if (error.response) {
      console.error("Error from Spring service:", error.response.data);
      res.status(error.response.status).json({
        error: error.response.data.message || "Failed to Update user",
      });
    } else {
      console.error("Server error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
});

// delete vehicles
app.delete("/api/delete/vehicles/:id", async (req, res) => {
  const vehicleId = req.params.id;

  try {
    const response = await axios.delete(
      `${SPRING_ENDPOINT}${routes.VEHICLESLIST}/${vehicleId}`
    );

    res
      .status(response.status)
      .json({ message: "Vehicle deleted successfully" });
  } catch (error) {
    if (error.response) {
      console.log("Response from Spring service:", error.response.data);

      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// rfid Related Endpoints ________________________________________________
// get all rfid with ID
app.get("/api/rfidkey-id-list", async (req, res) => {
  try {
    const response = await axios.get(
      `${SPRING_ENDPOINT}${routes.RFIDKEYSIDLIST}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Rfid-Keys:xxx", error.message);
    res.status(500).json({ error: "Failed to fetch Rfid-Keys" });
  }
});

// get all rfidkeys
app.get("/api/rfidkey", async (req, res) => {
  try {
    const response = await axios.get(
      `${SPRING_ENDPOINT}${routes.RFIDKEYSLIST}`
    );

    res.json(response.data);
  } catch (error) {
    console.error("Error fetching Rfid-Keys:", error.message);
    res.status(500).json({ error: "Failed to fetch Rfid-Keys" });
  }
});

// Create all rfidkeys
app.post("/api/create/rfid", async (req, res) => {
  const rfidData = req.body;

  // Validate the data coming from the frontend
  const validationResults = validateRfidRegistration(rfidData);

  if (!validationResults.valid) {
    return res.status(400).json({
      errorMessage: validationResults.errors.join(", "), // Join multiple errors with a comma
    });
  }

  try {
    const response = await axios.post(
      `${SPRING_ENDPOINT}${routes.RFIDKEYSLIST}`,
      rfidData
    );

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Delete all rfidkeys
app.delete("/api/delete/rfidkey/:id", async (req, res) => {
  const rfidkey = req.params.id;

  try {
    const response = await axios.delete(
      `${SPRING_ENDPOINT}${routes.RFIDKEYSLIST}/${rfidkey}`
    );

    res
      .status(response.status)
      .json({ message: "Rfid Key deleted successfully" });
  } catch (error) {
    if (error.response) {
      console.log("Response from Spring service:", error.response.data);

      const errorMessage = error.response.data.errorMessage || "Unknown error";
      res.status(error.response.status).json({ errorMessage });
    } else {
      console.log("Error:", error.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
