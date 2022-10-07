const { sqlQuery, inserInDatabase } = require("../database/databaseQuery");
const saveOwnerCar = async (car) => {
  console.log("========saveOwnerCar=========");
  console.log(car);

  //car.plateNumber = formatCarPlate(car.plateNumber);
  const findQuery =
    "SELECT * FROM Vehicles WHERE plateNumber = '" + car.plateNumber + "'";
  try {
    let pastRecords = await sqlQuery(findQuery);
    console.log(1);
    if (pastRecords.length == 0) {
      const newRecord = await inserInDatabase("Vehicles", car);
      if (newRecord && newRecord.affectedRows == 1) {
        console.log(2);
        return true;
      } else {
        console.log("Error saving car");
        throw new Error("Couldn't insert owner car");
      }
    } else {
      console.error("Coudln't Save Car");
      return false;
    }
  } catch (e) {
    throw e;
  }
};

// let formatCarPlate = (plate) => {
//   plate = plate.trim();
//   let formattedCarPlate = "";

//   for (let i = 0; i < plate.length; i++) {
//     if (plate[i] !== " " && i < plate.length - 1) {
//       formattedCarPlate = formattedCarPlate + plate[i] + " ";
//     }
//   }

//   return formattedCarPlate + plate[plate.length - 1];
// };

module.exports = saveOwnerCar;
