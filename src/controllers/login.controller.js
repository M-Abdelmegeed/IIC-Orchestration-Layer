const emailValidator = require("../validatators/email.validator");
const passwordValidator = require("../validatators/password.validator");
const { queryDatabase } = require("../services/database/databaseQuery");

const loginController = (req, res, next) => {
  try {
    const email = req.body.email.toLowerCase().trim(); // temp might be the email or username
    const password = req.body.password.trim();
    const fcmToken = req.body.fcmToken;

    // validate input data
    if (!passwordValidator(password) || !emailValidator(email)) {
      res.status(401).send("Invalid Inputs");
      return;
    }

    // get password by email
    queryDatabase("login", { email, password, fcmToken }, req, res, next);
  } catch (error) {
    res.status(401).send("Error: wrong credentials: " + error);
  }
};

module.exports = loginController;
