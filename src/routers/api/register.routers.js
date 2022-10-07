const { Router } = require("express");
const {
  buildingAndPhone,
  registerUser,
} = require("../../controllers/register.controller");
const auth = require("../../services/authentication/auth");
const sendOTPMessage = require("../../services/OTP/sendOtp");
const validateOTPmessage = require("../../services/OTP/validateOTP");

const registerRouter = Router();

// all the routes that the mobile user will use to register
registerRouter.post("/unitAndPhone", buildingAndPhone, sendOTPMessage);

registerRouter.post("/validateOTP", validateOTPmessage);

registerRouter.post("/registerUser", auth, registerUser);

module.exports = registerRouter;
