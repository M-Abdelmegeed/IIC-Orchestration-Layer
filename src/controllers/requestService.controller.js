const deocdeToken = require("../services/authentication/decodeToken");
const { requestService } = require("../services/database/databaseQuery");

const requestServiceController = (req, res) => {
  try {
    // get the data from the user
    const serviceType = req.body.serviceType;
    const residentId = deocdeToken(req.headers.authorization);
    // let dateOfRequest = req.body.dateOfRequest;
    let employeeId;

    // console.log(dateOfRequest);

    // determine the employee for the service
    if (serviceType === "البستنة") {
      employeeId = 1;
    } else if (serviceType === "الكهرباء") {
      employeeId = 2;
    } else {
      employeeId = 3;
    }

    requestService(
      {
        types: serviceType,
        employeeId,
        residentId,
        // dateOfRequest,
      },
      res
    );
  } catch (error) {
    res.status(401).send("Error: " + error);
  }
};

module.exports = requestServiceController;
