require("dotenv").config();
const jwt = require("jsonwebtoken");
const phoneValidator = require("../validatators/phone.validator");
const passwordValidator = require("../validatators/password.validator");
const hashPassword = require("../services/hashing/hashPassword");
const {
  updateData,
  queryDatabase,
} = require("../services/database/databaseQuery");

const getUnitAndPhone = (req, res, next) => {
  try {
    // take the building number and the phone number from the user
    let phoneNumber = req.body.phone.trim();
    const unitNumber = req.body.unitNumber.trim().toUpperCase();

    // add +2 to the start of the phone number
    phoneNumber = `+2${phoneNumber}`;

    // validate the input from the user
    if (!phoneValidator(phoneNumber)) {
      res.status(401).send("Invalid Input");
      return;
    }

    queryDatabase(
      "unitAndPhoneResetPassword",
      {
        unitNumber,
        phoneNumber,
      },
      req,
      res,
      next
    );
  } catch (error) {
    res.status(401).send("Error resting password: " + error);
  }
};

const validateOtp = (req, res, next) => {
  try {
    // input from the user
    const otp = req.body.otp.trim();
    const phone = req.body.phone.trim();

    // validate the input from the user
    if (!phoneValidator(phone)) {
      res.status(401).send("Invalid Input");
      return;
    }

    // validate the phone and otp with the data in mongoDB
    let valid;

    // if valid, return a token
    if (valid) {
      const token = jwt.sign({ phone, otp }, process.env.ACCESS_TOKEN_SECRET);
      return token;
    } else {
      res.status(401).send("Error: Invalid OTP");
      return;
    }

    // else return an error
  } catch (error) {
    res.status(401).send("Error resting password: " + error);
  }
};

// TODO: IT ISN'T WORKING
const resetOtp = (req, res, next) => {
  try {
    // take the input from the user
    let phone = req.body.phone.trim();

    // validate the input from the user
    if (!phoneValidator(phone)) {
      res.status(401).send("Invalid Input");
      return;
    }

    // TODO: send again the otp to the user phone

    // return the response to the user
    res.send("OTP sent");
  } catch (error) {
    res.status(401).send("Error resting password: " + error);
  }
};

const resetPassword = async (req, res, next) => {
  try {
    // take input from the user
    const password = req.body.password.trim();
    let phone = req.body.phone.trim();

    // add +2 to the start of the phone number
    phone = `+2${phone}`;

    // validate the input from the user
    if (!passwordValidator(password)) {
      res.status(401).send("Invalid Input");
      return;
    }

    // hash the password
    const hashedPassword = await hashPassword(password);

    // add new password in the database
    queryDatabase(
      "resetPassword",
      {
        hashedPassword,
        phoneNumber: phone,
      },
      req,
      res,
      next
    );
  } catch (error) {
    res.status(401).send("Error resting password: " + error);
  }
};

module.exports = { getUnitAndPhone, validateOtp, resetOtp, resetPassword };
