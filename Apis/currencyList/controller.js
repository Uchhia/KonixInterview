const Currency = require("./model");
const axios = require("axios");

//BASE URL for coingecko apis
const BASE_URL = "https://api.coingecko.com/api/v3";

//apis for fetching currency list data from DB
exports.getCurrencyList = async (req, res) => {
  try {
    const currencyList = await Currency.find({});
    if (currencyList.length != 0) res.status(200).send(currencyList);
    else
      res
        .status(200)
        .json({ message: "Currency is not avialble at this moment" });
  } catch (err) {
    console.log(err.message);
  }
};

//Api to add currencies in DB
exports.addCurrencyList = async (req, res) => {
  try {
    const currencyData = await axios.get(`${BASE_URL}/coins/list`);

    Currency.deleteMany({});
    const currencyList = currencyData.data.map((currency) => ({
      currencyId: currency.id,
      currencySymbol: currency.symbol || "NA",
      currencyName: currency.name.toLowerCase(),
    }));
    const response = await Currency.insertMany(currencyList);
    if (response) res.status(201).send(response);
  } catch (err) {
    console.log("this is a Erro", err.message);
  }
};

//Api for updating currency data with trends
exports.updateCurrencyList = async (req, res) => {
  try {
    const currencyData = await axios.get(`${BASE_URL}/coins/list`);

    Currency.deleteMany({});
    const currencyList = currencyData.data.map((currency) => ({
      currencyId: currency.id,
      currencySymbol: currency.symbol || "NA",
      currencyName: currency.name.toLowerCase(),
    }));
    await Currency.insertMany(currencyList);
  } catch (err) {
    console.log(err.message);
  }
};
