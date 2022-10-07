const mongoose = require('mongoose');

const OTPSchema = new mongoose.Schema({
    phoneNumber: { type: String, required: true },
    oneTimePassword: { type: String, required: true },
    timestamp: { type: Date, required: true, index: { expires: 300 } },
});

const Otp = mongoose.model("OTPmodel", OTPSchema);
module.exports = Otp;