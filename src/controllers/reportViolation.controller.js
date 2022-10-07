const deocdeToken = require("../services/authentication/decodeToken");
const { reportViolation } = require("../services/database/databaseQuery");

const reportViolationController = (req, res) => {
  try {
    const description = req.body.description;
    const residentId = deocdeToken(req.headers.authorization);
    const category = req.body.category;
    const unitCode = req.body.unitCode;

    reportViolation({ description, residentId, category, unitCode }, res);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

module.exports = reportViolationController;
