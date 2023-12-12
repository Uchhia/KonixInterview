const express = require("express");
const router = express.Router();

const controller = require("./controller");
const { schema } = require("./schema");

// Middleware function for validating the request body against the Joi schema
function schemaValidation(req, res, next) {
  try {
    const result = schema.validate(req.body);

    // Check if there is a validation error
    if (result.error) {
      throw new Error(result.error);
    }

    // Validation passed, proceed to the next middleware or route handler
    next();
  } catch (error) {
    // Log the validation error and send a 400 Bad Request response
    console.log("Validation failed:", error.message);
    res.status(400).json({ error: error.message });
  }
}

// Route to get the currency list
router.get("/currencylist", controller.getCurrencyList);

// Route to add an item to the currency list
router.post("/currencylist", controller.addCurrencyList);

// Route to convert currencies, with schema validation middleware
router.get("/convert", schemaValidation, controller.convertCurrency);

// Export the router for use in other parts of the application
module.exports = router;
