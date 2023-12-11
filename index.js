const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();

const currencyList = require("./Apis/currencyList/route");
const port = process.env.PORT || 9000;
const URL = process.env.DATABASE_URL;
const uri = URL;

app.use(express.json());
app.use(cors());

const allRoutes = [currencyList];

// Use the user routes
app.use("/", allRoutes);
//database connection
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB Atlas:", error);
  });

//listening server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
