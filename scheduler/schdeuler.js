const cron = require("node-cron");
const controller = require("../Apis/currencyList/controller");

const setupScheduler = () => {
  // Schedule a cron job to update the currency list every hour
  cron.schedule("0 * * * *", async () => {
    // Update the currency list and log the result
    await controller
      .updateCurrencyList()
      .then((res) => console.log("List updated"));
  });
};

module.exports = setupScheduler;
