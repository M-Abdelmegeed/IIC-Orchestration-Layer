const { Router } = require("express");
const {
  getUnitAndPhone,
  resetPassword,
} = require("../../controllers/forgotPassword.controller");
const auth = require("../../services/authentication/auth");
const sendOTPMessage = require("../../services/OTP/sendOtp");
const validateOTPmessage = require("../../services/OTP/validateOTP");

const forgotPasswordRouter = Router();

// all the routes that the mobile user will use to reset the password
forgotPasswordRouter.post("/unitAndPhone", getUnitAndPhone, sendOTPMessage);

forgotPasswordRouter.post("/validateOtp", validateOTPmessage);

forgotPasswordRouter.post("/resetOtp", sendOTPMessage);

forgotPasswordRouter.post("/resetPassword", auth, resetPassword);

module.exports = forgotPasswordRouter;
