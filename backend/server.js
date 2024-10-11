require("dotenv").config();
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
const axios = require("axios"); // npm i axios
const bodyParser = require("body-parser");

const routes = require("./routes"); // Import routes

// validators
const validateUserData = require("./validators/userAccounts/accountValidator");

const app = express();
// Enable CORS to allow requests from the React frontend
app.use(cors());
// app.use(cors({ origin: "http://192.168.200.182:48624" }));
// For parsing JSON bodies
app.use(bodyParser.json());
// Custom port from env file
const PORT = process.env.Node_PORT;
// Get Spring Boot endpoint from the .env file
const SPRING_ENDPOINT = process.env.SPRING_ENDPOINT;

// User Account Related Endpoints
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

// get all users list
app.get("/api/users-id", async (req, res) => {
  try {
    const response = await axios.get(`${SPRING_ENDPOINT}${routes.USERLISTID}`);

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
      `${SPRING_ENDPOINT}${routes.USERSLIST}`,
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
