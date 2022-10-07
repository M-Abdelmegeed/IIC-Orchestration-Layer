const admin = require("firebase-admin");
// admin.initializeApp();
var serviceAccount = require("./iic-flutter-application-firebase-adminsdk-m1r8v-6109ae7508.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
admin.messaging().sendMulticast({
  tokens: ["cciD5DrRR_SPLipOxsJMgc:APA91bGxXVAZcXpUX6D4E3OIQy5dMONWrv5Li48DvVXpK5ddnOfMBUgfeq7SyV_I0M0jseo6v18O5g86VR4fArjpRsMBFTSUooC4wHO-Wjhr3q4kH5r_xcG0z4-FmD66-WMEv5O5ZkMl"],
  notification: {
    title: "You have a delivery waiting!",
    body: "Mcdonald's has a delivery for you"
  },
});