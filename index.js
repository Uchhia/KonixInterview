const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db/connect"); // Import the connectDB function for MongoDB connection
const setupScheduler = require("./scheduler/schdeuler"); // Import the scheduler setup function

const controller = require("./Apis/currencyList/controller");
const currencyList = require("./Apis/currencyList/route");

const port = process.env.PORT || 9000;

app.use(express.json()); // Middleware to parse JSON bodies in requests
app.use(cors()); // Middleware to enable Cross-Origin Resource Sharing

const allRoutes = [currencyList];
app.use("/apis", allRoutes); // Mount all API routes under the '/apis' path

// Use the connectDB function to establish the MongoDB connection
connectDB();

// Set up the scheduler
setupScheduler();
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
