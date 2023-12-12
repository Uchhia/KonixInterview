const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const URL = process.env.DATABASE_URL;
    const uri = URL;

    // Connect to MongoDB Atlas
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  }
};

module.exports = connectDB;
