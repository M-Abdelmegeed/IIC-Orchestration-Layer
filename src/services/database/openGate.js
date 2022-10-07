const { sqlQuery, findCarPlate } = require('../database/databaseQuery');
const openGate = async (carPlate) => {
    const res = await new Promise((resolve) => {
        findCarPlate(carPlate).then(res => {
            let found = []
            console.log(res)
            if (res == false) {
                found = false
            }
            if (res.type == "visitor") {
                console.log(res.result[0].signOut)
                const today = new Date();
                const dateDiff = res.result[0].signOut - today;
                console.log(dateDiff)
                if (dateDiff >= 0) { found = "visitor arrived" }
                else {
                    found = "visitor access denied"
                }
            } else if (res.type == "resident") {
                found = "resident access granted"
            }
            resolve(found)
        })
    })
    return res
}

module.exports = openGate
