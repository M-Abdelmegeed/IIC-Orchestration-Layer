const deocdeToken = require("../services/authentication/decodeToken");
const { reportIncident } = require("../services/database/databaseQuery");

const reportIncidentController = (req, res) => {
  try {
    // get the data from the user
    const description = req.body.description.trim();
    const residentId = deocdeToken(req.headers.authorization);

    reportIncident(
      {
        description,
        residentId,
      },
      res
    );
  } catch (error) {
    res.status(401).send("Error: " + error);
  }
};

module.exports = reportIncidentController;
