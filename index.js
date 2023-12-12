const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./db"); // Import the connectDB function
const setupScheduler = require("./scheduler/schdeuler");

const controller = require("./Apis/currencyList/controller");
const currencyList = require("./Apis/currencyList/route");

const port = process.env.PORT || 9000;

app.use(express.json());
app.use(cors());

const allRoutes = [currencyList];
app.use("/apis", allRoutes);

// Use the connectDB function to establish the MongoDB connection
connectDB();

// Set up the scheduler
setupScheduler();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
