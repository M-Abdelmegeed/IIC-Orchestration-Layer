const tokenDocder = require("../services/authentication/decodeToken");

const showVisitorsController = (req, res) => {
  try {
    const token = req.headers.authorization;
    const email = tokenDocder(token).email;

    // TODO: get the list of visitors using the email address
    let visitors;

    res.send(visitors);
  } catch (error) {
    res.status(500).send("Error: " + error.message);
  }
};

module.exports = showVisitorsController;
