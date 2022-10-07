const { sqlQuery, findCarPlate } = require('../database/databaseQuery');
const getUserName = async (residentId) => {
    const sql = "SELECT userName FROM Residents WHERE residentId=" + residentId
    const userName = await sqlQuery(sql)
    return userName[0].userName;
}

module.exports = getUserName;