const admin = require("firebase-admin");
const { sqlQuery } = require("../database/databaseQuery");

const sendNotification = async (residentId, firstName, order, orderId) => {
  const x = await sqlQuery(
    `SELECT FCMToken from Residents where residentId = '` + residentId + `';`
  );

  // print the FCM token of
  console.log(x[0]["FCMToken"]);

  admin.messaging().sendMulticast({
    tokens: [x[0]["FCMToken"]],
    data: {
      orderId: `${orderId}`,
    },
    notification: {
      title: `Hello ${firstName}, you have a delivery waiting!`,
      body: `${order} has a delivery for you`,
    },
    android: {
      notification: {
        icon: "stock_ticker_update",
        color: "#7e55c3",
        priority: "high",
        sound: "default",
      },
    },
  });

  console.log("Notification Sent");
};

module.exports = sendNotification;
