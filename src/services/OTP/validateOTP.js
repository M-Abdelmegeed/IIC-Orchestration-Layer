const mongoose = require("mongoose");
const Otp = require("../../models/OTPmodel");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const decodeToken = require("../authentication/decodeToken");

const validateOTPmessage = async (req, res, next) => {
  try {
    let phoneNumber = req.body.phone;
    const otp = req.body.otp;

    // add +2 to the start of the phone number
    phoneNumber = `+2${phoneNumber}`;

    const OTP = await Otp.find({ phoneNumber }).select("oneTimePassword");
    if (otp === OTP[OTP.length - 1].oneTimePassword.toString()) {
      res.phoneNumber = phoneNumber;

      const token = jwt.sign({ valid: true }, process.env.ACCESS_TOKEN_SECRET);

      if (token) {
        res.send(token);
      } else {
        res.status(500).send("Error: couldn't generate token");
      }
    } else {
      res.status(401).send("Invalid OTP");
    }
  } catch (error) {
    res.status(401).send("Error: " + error);
  }
};

module.exports = validateOTPmessage;
