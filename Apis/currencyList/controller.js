// Import necessary modules and dependencies
const Currency = require("./model");
const axios = require("axios");
const { schema } = require("./schema");

// Define the base URL for Coingecko APIs
const BASE_URL = "https://api.coingecko.com/api/v3";

// --- API Endpoints ---

// Fetch the list of currencies from the database
exports.getCurrencyList = async (req, res) => {
  try {
    // Retrieve the currency list from the database
    const currencyList = await Currency.find({});

    // Respond with the currency list or a message if it's empty
    if (currencyList.length !== 0) {
      res.status(200).send(currencyList);
    } else {
      res
        .status(200)
        .json({ message: "Currency is not available at this moment" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

// Add a list of currencies to the database
exports.addCurrencyList = async (req, res) => {
  try {
    // Fetch currency data from Coingecko API
    const currencyData = await axios.get(`${BASE_URL}/coins/list`);

    // Clear existing currency data from the database
    await Currency.deleteMany({});

    // Map fetched currency data to the desired format for database insertion
    const currencyList = currencyData.data.map((currency) => ({
      currencyId: currency.id,
      currencySymbol: currency.symbol || "NA",
      currencyName: currency.name.toLowerCase(),
    }));

    // Insert new currency data into the database
    const response = await Currency.insertMany(currencyList);

    // Respond with the inserted data
    if (response) res.status(201).send(response);
  } catch (err) {
    console.log(err.message);
  }
};

// Update the list of currencies in the database (stub for potential future use)
exports.updateCurrencyList = async (req, res) => {
  try {
    // Fetch currency data from Coingecko API
    const currencyData = await axios.get(`${BASE_URL}/coins/list`);

    // Clear existing currency data from the database
    Currency.deleteMany({});

    // Map fetched currency data to the desired format for database insertion
    const currencyList = currencyData.data.map((currency) => ({
      currencyId: currency.id,
      currencySymbol: currency.symbol || "NA",
      currencyName: currency.name.toLowerCase(),
    }));

    // Insert new currency data into the database
    await Currency.insertMany(currencyList);
  } catch (err) {
    console.error(err.message);
  }
};

// Convert currencies and fetch historical price data
exports.convertCurrency = async (req, res) => {
  try {
    // Extract request parameters
    const { fromCurrency, toCurrency, date } = req.body;

    // Initialize the response object
    const responseObject = {
      fromCurrency: fromCurrency || "",
      toCurrency: toCurrency || "",
      date: date || "",
      price: "",
    };

    // Check if 'fromCurrency' is a valid currency
    const checkFromCurrency = await Currency.findOne({
      currencyId: fromCurrency,
    });
    if (!checkFromCurrency) throw new Error("fromCurrency is not valid");

    // Check if 'toCurrency' is a valid currency
    const checkToCurrency = await Currency.findOne({
      currencyId: toCurrency,
    });
    if (!checkToCurrency) throw new Error("toCurrency is not valid");

    // Fetch the currency symbol for 'toCurrency'
    const toCurrencyObject = await Currency.findOne({ currencyId: toCurrency });
    const toCurrencySymbol = toCurrencyObject.currencySymbol;

    // Fetch historical price data for conversion
    const priceList = await axios(
      `${BASE_URL}/coins/${fromCurrency}/history?date=${date}&localization=false`
    );
    const historicalPrice =
      priceList.data["market_data"]["current_price"][toCurrencySymbol];

    // Update the response object with the historical price
    responseObject.price = historicalPrice;

    // Respond with the converted currency and historical price
    res.status(200).json(responseObject);
  } catch (error) {
    console.error(error.message);

    // Respond with an error message
    res.json({ message: error.message });
  }
};
