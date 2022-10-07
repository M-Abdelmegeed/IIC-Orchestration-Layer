const buildingValidator = (buildingNumber) => {
  buildingNumber = buildingNumber.trim();

  if (buildingNumber == "") {
    return false;
  }

  return true;
};

module.exports = buildingValidator;
