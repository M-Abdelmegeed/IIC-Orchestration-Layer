const databaseQueries = require("../database/databaseQuery");

const saveVisitorCar = async (visitorObj) => {
  try {
    // visitorObj.plateNumber = formatCarPlate(visitorObj.plateNumber);

    const newRecord = await databaseQueries.inserInDatabase(
      "Visitors",
      visitorObj
    );
    if (newRecord && newRecord.affectedRows == 1) {
      return true;
    } else {
      throw new Error("Couldn't insert visitor car");
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

module.exports = saveVisitorCar;
