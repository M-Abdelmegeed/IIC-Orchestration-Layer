const hashPassword = require("../services/hashing/hashPassword");
require("dotenv").config();
const buildingValidator = require("../validatators/building.validator");
const phoneValidator = require("../validatators/phone.validator");
const usernameValidator = require("../validatators/username.validator");
const emailValidator = require("../validatators/email.validator");
const passwordValidator = require("../validatators/password.validator");
const { queryDatabase } = require("../services/database/databaseQuery");

const buildingAndPhone = async (req, res, next) => {
  try {
    // take the building number and the phone number from the user
    const unitNumber = req.body.unitNumber.trim().toUpperCase();
    let phoneNumber = req.body.phone.trim();

    // add +2 to the start of the phone number
    phoneNumber = `+2${phoneNumber}`;

    // validate the input of the user
    if (!buildingValidator(unitNumber) || !phoneValidator(phoneNumber)) {
      res.status(401).send("Invalid Input");
      return;
    }

    // check if the builiding number validates with phone number
    queryDatabase(
      "unitAndPhoneRegister",
      {
        unitNumber,
        phoneNumber,
      },
      req,
      res,
      next
    );
  } catch (err) {
    res.status(401).send("Error: " + err);
  }
};

const registerUser = async (req, res, next) => {
  try {
    // take the input of the user
    const username = req.body.username.trim();
    let email = req.body.email.toLowerCase().trim();
    const password = req.body.password.trim();
    let phoneNumber = req.body.phone.trim();

    // add +2 to the start of the phone number
    phoneNumber = `+2${phoneNumber}`;

    // validate the input
    if (
      !emailValidator(email) ||
      !usernameValidator(username) ||
      !passwordValidator(password)
    ) {
      res.status(401).send("Invalid Input");
      return;
    }

    // hash the password;
    const hashedPassword = await hashPassword(password);

    // add the data to the database
    queryDatabase(
      "registerUser",
      {
        email,
        userName: username,
        hashedPassword,
        phoneNumber,
      },
      req,
      res,
      next
    );
  } catch (error) {
    res.status(401).send("Error: " + error);
  }
};

module.exports = { buildingAndPhone, registerUser };
