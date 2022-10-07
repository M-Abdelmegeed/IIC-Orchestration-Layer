const { sqlQuery, inserInDatabase } = require("../database/databaseQuery");
const addFamilyMember = async (memberObj) => {
    //const query = `INSERT INTO ownerCars (carNumber) VALUES ('` + car + `')`;
    const findQuery =
      "SELECT * FROM FamilyMembers WHERE phoneNumber = '" + memberObj.phoneNumber + "'";
    console.log("qqqqqqqqq",findQuery)
      try {
      let pastRecords = await sqlQuery(findQuery);
  
      if (pastRecords.length == 0) {
        const newRecord = await inserInDatabase("FamilyMembers", memberObj);
        console.log("new record",newRecord);
        if (newRecord) {
          return true;
        } else {
          throw new Error("Couldn't insert family member");
        }
      } else {
        console.error("Coudln't Save family member");
        return false;
      }
    } catch (e) {
      throw e;
    }
  };
  
  module.exports = addFamilyMember