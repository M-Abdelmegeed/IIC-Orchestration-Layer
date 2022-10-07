const phoneValidator = (phoneNumber) => {
  phoneNumber = phoneNumber.trim();
  const regex = /^01[0125][0-9]{8}$/;
  if (
    phoneNumber[0] === "+" &&
    phoneNumber[1] === "2" &&
    phoneNumber[2] === "0" &&
    phoneNumber[3] === "1" &&
    phoneNumber.length === 13
  ) {
    return true;
  } else return false;
};

module.exports = phoneValidator;
