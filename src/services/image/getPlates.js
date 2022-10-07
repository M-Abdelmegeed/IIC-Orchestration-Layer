const { arrivedVisitor } = require('../database/databaseQuery');
const openGate = require('../database/openGate');
const getPlates = async (req, res) => {
    try {
        const carPlates = req.body.plate;
        console.log(carPlates);
        const result = await openGate(carPlates)
        if (result == "visitor arrived") {
            arrivedVisitor("Visitors", carPlates);
            res.send("Visitor arrived, open gates!")
        } else if (result == "visitor access denied") {
            res.send("Visitor access denied !")
        } else if (result == "resident access granted") {
            res.send("resident access granted")
        } else {
            res.send("Access Denied!")
        }
    }
    catch (err) {
        res.send("error getting car plates");
    }
}

module.exports = getPlates;