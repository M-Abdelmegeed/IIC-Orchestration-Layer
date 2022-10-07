const deocdeToken = require("../services/authentication/decodeToken");
const {payService} = require("../services/database/databaseQuery")

const payServiceController = (req, res) => {
    try {
      // get the data from the user
      const residentId = deocdeToken(req.headers.authorization);
      const serviceType = req.body.service;
      const amount = req.body.amount;
      payService(residentId, serviceType, amount);
    res.send("Successfull Payment!");
    } catch (error) {
      res.status(401).send("Error: " + error);
    }
  };
  
  module.exports = payServiceController;