const deocdeToken = require("../services/authentication/decodeToken");
const {payMaintenance} = require("../services/database/databaseQuery");

const payMaintenanceController = (req, res) => {
    try {
      // get the data from the user
      const residentId = deocdeToken(req.headers.authorization);
    //   const serviceType = req.body.service;
    //   const amount = req.body.amount;
    payMaintenance(residentId);
    res.send("Maintenance Paid!");
    } catch (error) {
      res.status(401).send("Error: " + error);
    }
  };
  
  module.exports = payMaintenanceController;