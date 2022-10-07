const {getCarsByResidentId} = require("../services/database/databaseQuery")
const getUserName = require("../services/core-services/getUserName");
const decodeToken = require("../services/authentication/decodeToken");

const getCarsArrayController = async(req,res)=>{
    try{
        const residentId = await decodeToken(req.headers.authorization);
        const data=await getCarsByResidentId(residentId);
        res.send(data)
    }
    catch(e)
    {
        res.send(e)
    }
}

module.exports = getCarsArrayController