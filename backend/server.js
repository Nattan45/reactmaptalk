require("dotenv").config();
const express = require("express"); // npm i express
const cors = require("cors"); // npm i cors
const axios = require("axios"); // npm i axios
const bodyParser = require("body-parser");

const routes = require("./routes"); // Import routes

const app = express();
// Enable CORS to allow requests from the React frontend
app.use(cors());
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

// create new user
app.post("/api/create/user", async (req, res) => {
  const userData = req.body; // Get the incoming data from the request

  try {
    // Send the data to the Spring endpoint
    const response = await axios.post(
      `${SPRING_ENDPOINT}${routes.USERSLIST}`,
      userData
    );

    // Log the response from the Spring service
    // like this
    console.log("Response from Spring service:", response.data);

    // Send the response back to the client
    res.status(response.status).json(response.data);
  } catch (error) {
    console.error("Error sending data to Spring service:", error.message);

    // Send an error response back to the client
    res.status(500).json({ error: "Failed to create user in Spring service" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
