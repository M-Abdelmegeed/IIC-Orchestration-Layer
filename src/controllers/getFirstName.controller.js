const deocdeToken = require("../services/authentication/decodeToken");
const { getFirstName } = require("../services/database/databaseQuery");

const getFirstNameController = (req, res) => {
  try {
    const residentId = deocdeToken(req.headers.authorization);

    getFirstName({ residentId }, res);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};
module.exports = getFirstNameController;
