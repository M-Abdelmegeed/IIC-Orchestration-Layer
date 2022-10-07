const { sqlQuery,getIDandUnitCodeByUserName } = require("../database/databaseQuery");
const addFamilyMember = require("../database/addFamilyMember");

const familyRegister = async (member,userName) => {
    const data =await getIDandUnitCodeByUserName(userName)
    try{
    const familyObj ={
        name:member._name_,
        age:member._age_,
        phoneNumber:'+2'+ member._phoneNumber_,
        residentId:data.residentId,
        unitCode:data.unitCode
    }
    console.log(familyObj)
    const result = await addFamilyMember(familyObj); 
    console.log(result)
        return result;
    } catch (e) {
        throw e;
    }
}
module.exports= familyRegister