const savevisitorCar = require("../database/saveVisitorCar");
const moment = require('moment');
const databaseQueries = require("../database/databaseQuery")
const visitorRegisterCar = async (car, duration,username) => {
    console.log("in function register car")
    console.log("car:",car,"duration ",duration,"username: ",username)
    const today = moment(new Date()).format('YYYY-MM-DD');
    const oldVisitor = await databaseQueries.sqlQuery("SELECT * FROM Visitors WHERE plateNumber='"+car+"' AND DATE(signOut) > '"+today+"'")
    if (oldVisitor.length==0)
    {
        const data = await databaseQueries.getIDandUnitCodeByUserName(username)
        const signIn = moment(new Date()).format('YYYY-MM-DD');
        const signOut = moment(new Date()).add(duration, 'd').format('YYYY-MM-DD');
        visitorObj = {
            plateNumber: car,
            signIn: signIn,
            signOut: signOut,
            duration: duration,
            residentId: data.residentId
        }
        const res = await savevisitorCar(visitorObj)
        return res
    }
    else
    {
        const newSignOut = moment(oldVisitor[0].signOut).add(duration, 'd').format('YYYY-MM-DD');
        const newDuration= Number(oldVisitor[0].durationOfStay) + Number(duration)
        var sql="UPDATE Visitors SET signOut = '"+newSignOut+"'  WHERE visitorId = "+oldVisitor[0].visitorId+"";
        var newRec =await databaseQueries.sqlQuery(sql)
        sql="UPDATE Visitors SET durationOfStay = '"+newDuration+"'  WHERE visitorId = "+oldVisitor[0].visitorId+"";
        var newRec =await databaseQueries.sqlQuery(sql)
        return "updated"
    }
}

// const saveNewVisitor=async()

module.exports = visitorRegisterCar;