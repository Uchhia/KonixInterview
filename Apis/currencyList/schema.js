const JoiBase = require("@hapi/joi");
const JoiDate = require("@joi/date");
const Joi = JoiBase.extend(JoiDate);
const moment = require("moment");

// Define a Joi schema for data validation
exports.schema = Joi.object({
  // Validate and trim the 'fromCurrency' field
  fromCurrency: Joi.string().trim().required().messages({
    "string.base": `fromCurrency should be a string`,
    "string.empty": `fromCurrency cannot be empty`,
    "any.required": `fromCurrency is a required field`,
  }),

  // Validate the 'toCurrency' field
  toCurrency: Joi.string().required().messages({
    "string.empty": `To Currency cannot be empty`,
    "any.required": `To Currency is a required field`,
  }),

  // Validate the 'date' field
  date: Joi.date().format("DD-MM-YYYY").max("now").required().messages({
    "date.max": "Date should not exceed today's date",
    "date.iso": "Date should be in ISO format",
    "any.required": `Date is a required field`,
  }),
});
