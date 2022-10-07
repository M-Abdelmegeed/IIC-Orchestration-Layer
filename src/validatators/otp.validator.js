const otpValidator = (otp) => {
  try {
    otp = otp.trim();
    otp = parseInt(otp); // convert the otp from string to int

    let regex = /^\d{6}$/;

    if (regex.test(otp)) {
      return true;
    }

    return false;
  } catch (error) {
    return false;
  }
};

module.exports = otpValidator;
