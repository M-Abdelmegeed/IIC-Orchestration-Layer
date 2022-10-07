const {getVisitorsByResidentId}=require("../services/database/databaseQuery")
const getUserName = require("../services/core-services/getUserName");
const decodeToken = require("../services/authentication/decodeToken");

const getVisitorsArrayController = async(req,res)=>{
    try{
        const residentId = await decodeToken(req.headers.authorization);
        const data=await getVisitorsByResidentId(residentId);
        res.send(data)
    }
    catch(e){console.log(e)}
}

module.exports = getVisitorsArrayController