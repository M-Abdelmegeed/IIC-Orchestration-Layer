const { sqlQuery,getIDandUnitCodeByUserName } = require("../database/databaseQuery");
const saveOwnerCar = require("../database/saveOwnerCar");

const ownerRegisterCar = async (car,userName) => {
    
    const data =await getIDandUnitCodeByUserName(userName)
    try {
        const carObject = {
            unitCode: data.unitCode,
            residentId: data.residentId,
            plateNumber: car
        }
        const result = await saveOwnerCar(carObject); 
        return result;
    } catch (e) {
        throw e;
    }
}

module.exports = ownerRegisterCar;