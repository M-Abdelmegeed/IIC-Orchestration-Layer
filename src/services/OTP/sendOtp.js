const mongoose = require("mongoose");
const Otp = require("../../models/OTPmodel");
const accountSid = PROCESS.env.ACCOUNTSID;
const authToken = PROCESS.env.AUTHTOKEN;
const client = require("twilio")(accountSid, authToken);

const sendOTPMessage = async (req, res) => {
  try {
    let phoneNumber = req.body.phone;

    // add +2 to the start of the phone number
    phoneNumber = `+2${phoneNumber}`;

    if (!phoneNumber) {
      phoneNumber = res.locals.phoneNumber;
    }

    var OTP = Math.floor(100000 + Math.random() * 900000).toString();
    client.messages
      .create({
        messagingServiceSid: process.env.messagingServiceSid,
        from: "+17179833847",
        to: phoneNumber,
        body: "Your OTP is " + OTP,
      })
      .then((message) => console.log(message.sid))
      .then()
      .then(
        res.send({
          username: res.locals.username,
          phoneNumber: phoneNumber,
          message: "OTP Sent succesfully!",
        })
      )
      .catch((err) => {
        res.status(500).send("Error sending the OTP");
      })
      .done();
    const newOTP = Otp();
    newOTP.phoneNumber = phoneNumber;
    newOTP.oneTimePassword = OTP;
    newOTP.timestamp = new Date();
    newOTP.save();
  } catch (error) {
    res.status(500).send(error.message);
  }
};

module.exports = sendOTPMessage;
