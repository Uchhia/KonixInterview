const mongoose = require("mongoose");

const currencySchema = new mongoose.Schema({
  currencyId: {
    type: String,
    required: true,
  },
  currencySymbol: {
    type: String,
    required: true,
  },
  currencyName: {
    type: String,
    required: true,
  },
});

const Currency = mongoose.model("Currencies", currencySchema);

module.exports = Currency;
