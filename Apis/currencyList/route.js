const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.get("/currencylist", controller.getCurrencyList);

router.post("/currencylist", controller.addCurrencyList);

module.exports = router;
