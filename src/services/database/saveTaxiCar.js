const { sqlQuery, inserInDatabase } = require("../database/databaseQuery");
const saveTaxiCar = async (car) => {
  try {
    //car.plateNumber = formatCarPlate(car.plateNumber);

    const newRecord = await inserInDatabase("Permissions", car);
    if (newRecord && newRecord.affectedRows == 1) {
      return true;
    } else {
      throw new Error("Couldn't insert owner car");
    }
  } catch (e) {
    throw e;
  }
};

// const formatCarPlate = (plate) => {
//   plate = plate.trim();

//   for (let i = 0; i < plate.length; i++) {
//     if (plate[i + 1] === " " && i + 1 < plate.length) {
//       i++;
//     } else {
//       plate = plate.subString(0, i + 1) + " " + plate.subString(i + 1);
//     }
//   }
// };

module.exports = saveTaxiCar;
