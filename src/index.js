const express = require("express"); // express application
const helmet = require("helmet"); // library to increase security by hiding some data
global.CM = require("./services/watson/configuration-manager");
const rateLimit = require("express-rate-limit"); // it limits requests of the user
require("dotenv").config(); // use the env variables
const router = require("./routers/index.routers"); // used to handle routes
const { MongoClient, ServerApiVersion } = require("mongodb");
const mongoose = require("mongoose");
const path = require("path");

const {
  sqlQuery,
  inserInDatabase,
  saveOrder,
  checkDelivery,
  getIdandFirstNameByUnitCode,
  getIDUnitCodeAndUserNameByPhoneNumber,
} = require("./services/database/databaseQuery");
const speechToText = require("./Google-Services/speechToText");
const admin = require("firebase-admin");

const car = {
  residentId: 2,
  unitCode: "C01",
  plateNumber: "abc345",
};
const app = express();
const PORT = process.env.PORT || 3000;
// console.log('11111')
// getIDUnitCodeAndUserNameByPhoneNumber('+201122586689').then(data=>console.log('1111111',data))
// console.log(data)

// MIDDLEWARES
// app.use(express.json()); // allow express to parse json data
app.use(helmet()); // this middlware adds more security by hiding some data
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(
  rateLimit({
    windowMs: 10 * 60 * 1000, // 10 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  })
);

// handle all routes
app.use(router);

app.use("/", express.static(path.join(__dirname, "./public"))); // load UI from public folder

// handle routes that doesn't exist
app.use((req, res) => {
  res.status(404).send("Error: routes doesn't exist (-_-)");
});

const uri = process.env.MONGO_CONNECTION_STRING;

class Database {
  constructor() {
    this._connect();
  }
  _connect() {
    mongoose
      .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log("Database connection successful");
      })
      .catch((err) => {
        console.error("Database connection error");
      });
  }
}
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
new Database();

var serviceAccount = require("../iic-flutter-application-firebase-adminsdk-m1r8v-6109ae7508.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});
