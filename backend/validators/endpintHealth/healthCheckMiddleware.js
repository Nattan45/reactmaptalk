// const axios = require("axios");

// let backendHealthStatus = {
//   springBoot: true,
//   mongoDB: true,
// };

// const SPRING_ENDPOINT = process.env.SPRING_ENDPOINT;
// const SPRING_BOOT_HEALTH_URL = `${SPRING_ENDPOINT}`; // Replace with actual Spring Boot health endpoint
// // const MONGO_DB_HEALTH_URL = "http://mongo-backend/health"; // Replace with actual MongoDB health endpoint

// const RETRY_LIMIT = 3; // Number of retry attempts
// const RETRY_DELAY = 2000; // 2 seconds delay between retries

// // let lastHealthCheckTime = Date.now();

// // Helper function to retry failed requests
// const retryRequest = async (requestFunc, retries) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await requestFunc();
//     } catch (error) {
//       if (i === retries - 1) {
//         throw error; // Throw the error if retries are exhausted
//       }
//       await new Promise((res) => setTimeout(res, RETRY_DELAY)); // Wait before retrying
//     }
//   }
// };

// // Periodically check both backends' health every 30 seconds
// const checkBackendHealth = async () => {
//   console.log("Performing health checks for both backends...");

//   // Check Spring Boot backend
//   try {
//     await retryRequest(async () => {
//       const springBootResponse = await axios.get(SPRING_BOOT_HEALTH_URL);
//       if (springBootResponse.status === 200) {
//         backendHealthStatus.springBoot = true;
//         console.log("Spring Boot backend is healthy.");
//       }
//     }, RETRY_LIMIT);
//   } catch (error) {
//     backendHealthStatus.springBoot = false;
//     console.error("Spring Boot backend is down after retries:", error.message);
//   }

//   // Check MongoDB backend
//   //   try {
//   //     await retryRequest(async () => {
//   //       const mongoDBResponse = await axios.get(MONGO_DB_HEALTH_URL);
//   //       if (mongoDBResponse.status === 200) {
//   //         backendHealthStatus.mongoDB = true;
//   //         console.log("MongoDB backend is healthy.");
//   //       }
//   //     }, RETRY_LIMIT);
//   //   } catch (error) {
//   //     backendHealthStatus.mongoDB = false;
//   //     console.error("MongoDB backend is down after retries:", error.message);
//   //   }

//   // Run the health check periodically (e.g., every 30 seconds)
//   setInterval(checkBackendHealth, 30 * 1000); // 30 seconds

//   //   lastHealthCheckTime = Date.now();
// };

// // Run the health check periodically (e.g., every 30 seconds)
// setInterval(checkBackendHealth, 30 * 1000); // 30 seconds

// // Middleware to check if both backends are healthy using cached health status
// const healthCheckMiddleware = (req, res, next) => {
//   //   if (backendHealthStatus.springBoot && backendHealthStatus.mongoDB) {
//   if (backendHealthStatus.springBoot) {
//     next();
//   } else {
//     console.log("One or more backends are down. Aborting request.");
//     res.status(503).send({
//       error: "Service Unavailable: One or more backends are down.",
//       details: {
//         springBoot: backendHealthStatus.springBoot,
//         // mongoDB: backendHealthStatus.mongoDB,
//       },
//     });
//   }
// };

// module.exports = healthCheckMiddleware;

//___________________________________________________________________________________________________________________________________________________________________________________
// const axios = require("axios");

// let backendHealthStatus = {
//   springBoot: false, // Initially set to false to block requests until the health check completes
// };

// const SPRING_ENDPOINT = process.env.SPRING_ENDPOINT;
// const SPRING_BOOT_HEALTH_URL = `${SPRING_ENDPOINT}`;
// const RETRY_LIMIT = 3;
// const RETRY_DELAY = 2000; // 2 seconds

// // Helper function to retry failed requests
// const retryRequest = async (requestFunc, retries) => {
//   for (let i = 0; i < retries; i++) {
//     try {
//       return await requestFunc();
//     } catch (error) {
//       if (i === retries - 1) {
//         throw error; // Throw the error if retries are exhausted
//       }
//       await new Promise((res) => setTimeout(res, RETRY_DELAY));
//     }
//   }
// };

// // Perform an initial health check
// const checkBackendHealth = async () => {
//   console.log("Performing initial health check...");

//   try {
//     await retryRequest(async () => {
//       const springBootResponse = await axios.get(SPRING_BOOT_HEALTH_URL);
//       if (springBootResponse.status === 200) {
//         backendHealthStatus.springBoot = true;
//         console.log("Spring Boot backend is healthy.");
//       } else {
//         console.error(
//           "Spring Boot backend returned non-200 status:",
//           springBootResponse.status
//         );
//         backendHealthStatus.springBoot = false;
//       }
//     }, RETRY_LIMIT);
//   } catch (error) {
//     backendHealthStatus.springBoot = false;
//     console.error("Spring Boot backend is down after retries:", error.message);
//   }
// };

// // Run the health check periodically (e.g., every 30 seconds)
// const startPeriodicHealthCheck = () => {
//   setInterval(checkBackendHealth, 30 * 1000); // 30 seconds
// };

// // Middleware to check if the backends are healthy
// const healthCheckMiddleware = (req, res, next) => {
//   if (backendHealthStatus.springBoot) {
//     next();
//   } else {
//     console.log("Spring Boot backend is down. Blocking request.");
//     res.status(503).send({
//       error: "Service Unavailable: Backend is down.",
//       details: {
//         springBoot: backendHealthStatus.springBoot,
//       },
//     });
//   }
// };

// // Start the initial health check and wait for it to complete before starting the server
// const initializeServer = async (app) => {
//   try {
//     await checkBackendHealth(); // Wait for the initial health check to complete
//     startPeriodicHealthCheck(); // Start periodic health checks after the initial one
//     app.listen(3000, () => {
//       console.log("Server is running on port 3000");
//     });
//   } catch (error) {
//     console.error("Error during initial health check:", error);
//     process.exit(1); // Exit if health check fails
//   }
// };

// module.exports = {
//   healthCheckMiddleware,
//   initializeServer,
// };
