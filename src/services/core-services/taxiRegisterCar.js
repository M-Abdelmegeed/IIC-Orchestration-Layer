const { sqlQuery,inserInDatabase,getIDandUnitCodeByUserName } = require("../database/databaseQuery");
const saveTaxiCar = require("../database/saveTaxiCar")
const taxiRegisterCar = async (car,userName) => {
    const data =await getIDandUnitCodeByUserName(userName)
    try {
        const taxiObject = {
            unitCode: data.unitCode,
            residentId: data.residentId,
            plateNumber: car,
            type:"taxi"
        }
        const result = await saveTaxiCar(taxiObject); 
        (result)
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = taxiRegisterCar;