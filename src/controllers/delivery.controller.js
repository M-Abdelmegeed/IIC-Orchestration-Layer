const { respondToDelivery } = require("../services/database/databaseQuery");

// api/v1/respondToDelivery
const deliveryController = async (req, res, next) => {
    const orderId = req.body.orderId;
    const userResponse = req.body.response;

    if (userResponse == 'yes') {
        await respondToDelivery(orderId, 'yes');
        res.status(200).send('Order accepted');
    } else if (userResponse == 'no') {
        await respondToDelivery(orderId, 'no');
        res.status(200).send('Order refused');
    }

    res.status(400);
}

module.exports = deliveryController;