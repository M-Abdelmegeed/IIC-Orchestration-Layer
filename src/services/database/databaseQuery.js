const { query, response } = require("express");
const mysql = require("mysql");
const jwt = require("jsonwebtoken");
const authHashedPasswordAndInputPassword = require("../hashing/authHashedPassword");
const { duration } = require("moment");
require("dotenv").config();

var connection = mysql.createConnection({
  host: "iicproject.ccwhbn21acxh.us-east-1.rds.amazonaws.com",
  user: "admin_IIC",
  password: "a1b2c3d4",
  database: "IIC_Project",
  port: "3306",
});

connection.connect(function (err) {
  if (!err) {
    console.log("SQL DB Connected");
  } else {
    console.error("Error connecting to SQL DB ... ");
  }
});

const sqlQuery = async (query) => {
  const res = await new Promise((resolve) => {
    connection.query(query, (error, results) => {
      if (error) {
        return console.error(error.message);
      }
      //(results)
      resolve(results);
    });
  });
  console.log(res);
  return res;
};

const inserInDatabase = async (databasename, value) => {
  var sql;
  if (databasename == "Residents") {
    sql =
      "INSERT INTO " +
      databasename +
      " (firstName,lastName,userName,email,password,phoneNumber,age,previousAddress,gender,nationality,type) VALUE ('" +
      value.firstName +
      "','" +
      value.lastName +
      "','" +
      value.userName +
      "','" +
      value.password +
      "','" +
      value.email +
      "','" +
      value.phoneNumber +
      "','" +
      value.age +
      "','" +
      value.previousAddress +
      "','" +
      value.gender +
      "','" +
      value.nationality +
      "','" +
      value.type +
      "')";
  } else if (databasename == "Vehicles") {
    sql =
      "INSERT INTO " +
      databasename +
      " (unitCode,residentId,plateNumber) VALUE ('" +
      value.unitCode +
      "'," +
      value.residentId +
      ",'" +
      value.plateNumber +
      "')";
  } else if (databasename == "Visitors") {
    sql =
      `INSERT INTO Visitors (plateNumber,durationOfStay,signIn,signOut,residentId) VALUE ('` +
      value.plateNumber +
      `',` +
      value.duration +
      `,'` +
      value.signIn +
      `','` +
      value.signOut +
      `',` +
      value.residentId +
      `)`;
  } else if (databasename == "FamilyMembers") {
    console.log(value);
    sql =
      "INSERT INTO " +
      databasename +
      " (name,phoneNumber,unitCode,age,residentId) VALUE ('" +
      value.name +
      "','" +
      value.phoneNumber +
      "','" +
      value.unitCode +
      "','" +
      value.age +
      "','" +
      value.residentId +
      "')";
  } else if (databasename == "Permissions") {
    sql =
      `INSERT INTO Permissions (unitCode,type,permissionsPlateNo,residentId) VALUE ('` +
      value.unitCode +
      `','` +
      value.type +
      `','` +
      value.plateNumber +
      `',` +
      value.residentId +
      `)`;
  }
  console.log(sql);
  const result = await sqlQuery(sql);
  console.log(result);
  return result;
};
// ///template for get from database
// const template = async (ddd) => {
//   sql = "select";
//   const x = await sqlQuery(sql);
//   return x;
// };

const getVisitorsByResidentId = async (id) => {
  var query = "SELECT plateNumber,signOut FROM Visitors WHERE residentId=" + id;
  const results = await sqlQuery(query);
  return results;
};

const getCarsByResidentId = async (id) => {
  var query = "SELECT plateNumber FROM Vehicles WHERE residentId=" + id;
  const results = await sqlQuery(query);
  return results;
};

// const deleteVisitorbyCarPlate = async (id) => {
//   var query = "SELECT plateNumber,signOut FROM Visitors WHERE residentId=" + id;
//   const results = await sqlQuery(query);
//   return results;
// };

// const reportViolation = async (data) => {
//   res = await inserInDatabase("Violations", data);
//   return res;
// };

const arrivedVisitor = async (tablename, plateNumber) => {
  var sql;
  sql =
    "UPDATE " +
    tablename +
    " SET date = current_date() WHERE plateNumber = '" +
    plateNumber +
    "'";
  connection.query(sql, function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log("Number of records inserted: " + result.affectedRows);
  });

  connection.query(sql, function (err, result) {
    if (err) {
      return console.error(err);
    }
    console.log("Number of records inserted: " + result.affectedRows);
  });
};

const getIDandUnitCodeByUserName = async (userName) => {
  console.log("getIDandUnitCode");
  const dataQuery =
    "SELECT unitCode,residentId FROM Residents WHERE userName='" +
    userName +
    "'";
  const data = await sqlQuery(dataQuery);
  return data[0];
};

const getIDUnitCodeAndUserNameByPhoneNumber = async (phoneNumber) => {
  console.log("getIDUnitCodeAndUserName");
  const dataQuery =
    "SELECT unitCode,residentId,userName FROM Residents WHERE phoneNumber='" +
    phoneNumber +
    "'";
  const data = await sqlQuery(dataQuery);
  return data[0];
};

const getIdandFirstNameByUnitCode = async (unitCode) => {
  let dataQuery =
    "SELECT residentId FROM Units where unitCode='" + unitCode + "'";
  let data = await sqlQuery(dataQuery);
  if (data.length == 0) return null;
  const residentId = data[0].residentId;
  dataQuery =
    "select firstName from Residents where residentId = '" + residentId + "'";
  data = await sqlQuery(dataQuery);
  if (data.length == 0) return null;
  const firstName = data[0].firstName;
  return { residentId, firstName };
};

const queryDatabase = async (functionality, data, request, response, next) => {
  var sql;

  if (functionality === "unitAndPhoneRegister") {
    sql = `Select email, residentId, userName from Residents where unitCode = '${data.unitNumber}' and phoneNumber = '${data.phoneNumber}';`;
  } else if (functionality === "unitAndPhoneResetPassword") {
    sql = `Select email, residentId, userName from Residents where unitCode = '${data.unitNumber}' and phoneNumber = '${data.phoneNumber}';`;
  } else if (functionality === "getUnitNumber") {
    sql = `Select unitCode from Residents where residentId = '${data.residentId}';`;
  } else if (functionality === "registerUser") {
    sql = `update Residents set userName = '${data.userName}', email = '${data.email}', password = '${data.hashedPassword}' where phoneNumber = '${data.phoneNumber}';`;
  } else if (functionality === "login") {
    sql = `select residentId, password from Residents where email = '${data.email}';`;
  } else if (functionality === "resetPassword") {
    sql = `update Residents set password = '${data.hashedPassword}' where phoneNumber = '${data.phoneNumber}';`;
  } else {
    return;
  }

  // act on the output of query to the controller
  connection.query(sql, (error, result) => {
    try {
      if (error) {
        response.status(401).send("Error: " + error);
        return;
      }

      // check if the user is already registered
      if (functionality === "unitAndPhoneRegister") {
        if (!result[0]) {
          response.status(401).send("Error: Wrong Input");
          return;
        } else if (result[0].email) {
          response.status(403).send("Error: You are already registered.");
          return;
        } else if (result[0].residentId) {
          response.locals.phoneNumber = data.phoneNumber;
          response.locals.userName = result[0].userName;
          next(); // send the OTP to the user
          return;
        }
      } else if (functionality === "login") {
        // result will hold username if the user is authenticated;
        if (!result[0]) {
          response.status(401).send("Error: Wrong Input");
          return;
        }
        if (
          !result[0].residentId ||
          !authHashedPasswordAndInputPassword(data.password, result[0].password)
        ) {
          response.status(401).send("Error: Invalid Input.");
          return;
        } else {
          // var loginResult = result;
          // add the fcm token in the database
          connection.query(
            `UPDATE Residents SET FCMToken = '${data.fcmToken}' WHERE email = '${data.email}';`,
            (error) => {
              try {
                if (error) {
                  response.status(401).send("Error: " + error);
                  return;
                }
                // It gives the user and ID to be able to access the API endpoints
                const token = jwt.sign(
                  { residentId: result[0].residentId },
                  process.env.ACCESS_TOKEN_SECRET
                );

                // send the token to the user to use it in it's app
                response.send(token);
              } catch (error) {
                response.status(401).send("Error: " + error.message);
              }
            }
          );
        }
      } else if (functionality === "unitAndPhoneResetPassword") {
        if (!result[0]) {
          response.status(401).send("Error: Wrong Input");
          return;
        } else if (result[0].residentId) {
          response.locals.phoneNumber = data.phoneNumber;
          response.locals.username = result[0].userName;
          next(); // send the OTP to the user
          return;
        }
      } else if (functionality === "resetPassword") {
        response.send("Password reset successfully");
        return;
      } else {
        response.send("Done Successfully");
        return;
      }
    } catch (error) {
      response.status(401).send("Error: " + error.message);
    }
  });
};

const getFirstName = async (data, response) => {
  try {
    let sql = `select firstName from Residents where residentId = ${parseInt(
      data.residentId
    )};`;

    connection.query(sql, (err, rows) => {
      if (err) {
        response.status(500).send("Error Getting first name: " + err.message);
      } else {
        response.send(rows[0].firstName);
      }
    });
  } catch (error) {
    response.status(500).send("Error: " + error.message);
  }
};

const reportViolation = (data, response) => {
  try {
    let sql = `insert into Violations (violationDescription, residentId, unitCode, category) values ('${data.description}', '${data.residentId}', '${data.unitCode}', '${data.category}');`;

    connection.query(sql, (err, rows) => {
      if (err) {
        response.status(500).send("Error Getting first name: " + err.message);
      } else {
        response.send("Report Violation Successfully.");
      }
    });
  } catch (error) {
    response.status(500).send("Error: " + error.message);
  }
};

const requestService = (data, response) => {
  try {
    let sql = `select unitCode from Residents where residentId = '${data.residentId}';`;

    connection.query(sql, (err, rows) => {
      if (err) {
        response.status(500).send("Error Getting first name: " + err.message);
      } else {
        const unitCode = rows[0].unitCode;
        console.log(unitCode);

        // know how to insert date into the database
        sql = `insert into ServiceTicketing (dateOfRequest, unitCode, employeeId, types, payed) values (current_date(), '${unitCode}','${data.employeeId}', '${data.types}',0);`;

        connection.query(sql, (err, rows) => {
          if (err) {
            response.status(500).send("Error: " + err.message);
          } else {
            response.send("Service requested successfully");
          }
        });
      }
    });
  } catch (error) {
    response.status(500).send("Error: " + error.message);
  }
};

const reportIncident = async (data, response) => {
  try {
    let sql = `select unitCode from Residents where residentId = '${data.residentId}';`;

    connection.query(sql, (err, rows) => {
      if (err) {
        response.status(500).send("Error Getting first name: " + err.message);
      } else {
        const unitCode = rows[0].unitCode;
        console.log(unitCode);

        sql = `insert into Incidents (residentId, unitCode, description) values ('${data.residentId}', '${unitCode}', '${data.description}');`;
        connection.query(sql, (err, rows) => {
          if (err) {
            response.status(500).send("Error: " + err.message);
          } else {
            response.send("Incident requested successfully");
          }
        });
      }
    });
  } catch (error) {
    response.status(500).send("Error: " + error.message);
  }
};

// this function performs the given sql query and returns the result
// const sqlQuery = async (query) => {
//   const sqlConfig = {
//     user: process.env.DB_USERNAME,
//     password: process.env.DB_PWD,
//     database: process.env.DB_NAME,
//     server: process.env.DB_SERVER,
//     port:3306,
//     pool: {
//       max: 20,
//       min: 0,
//       idleTimeoutMillis: 30000,
//     },
//     options: {
//       trustServerCertificate: false, // change to true for local dev / self-signed certs
//     },
//   };

//   try {
//     await mssql.connect(sqlConfig);
//     const result = await mssql.query(query);
//     return result;
//   } catch (err) {
//     console.log("Error: failed to open connection to database, " + err);
//   }
// };

// const getResult= async (value)=>{
//   console.log('1')
//   return value
// }

const findCarPlate = async (carPlate) => {
  let result = await sqlQuery(
    `SELECT * FROM Vehicles WHERE plateNumber = '` + carPlate + `'`
  );
  if (result && result.length > 0) {
    return {
      result: result,
      type: "resident",
    };
  }
  result = await sqlQuery(
    `SELECT * FROM Visitors WHERE plateNumber = '` + carPlate + `'`
  );
  if (result && result.length > 0) {
    return {
      result: result,
      type: "visitor",
    };
  } else return false;
};
//   /////// uncomment when team data finish ///////
//  // result = await sqlQuery(`SELECT * FROM  WHERE carNumber = '`+carPlate+`'`)
//   // if(result && result.recordset.length!=0)
//   // {
//   //   return {
//   //     result:result.recordset,
//   //     type : "taxi"
//   // }
//   // }
//   return false
// }

const saveQRcode = async (QRID) => {
  try {
    let sql =
      `insert into QR (QRid, Flag, dateOfissue) values ('` +
      QRID +
      `', 0,current_date() );`;

    connection.query(sql, (err, rows) => {
      if (err) {
        // response.status(500).send("Error inserting record in the database" + err.message);
        console.log("QR Code Save Error");
      } else {
        // response.send("Record Added Successfully!");
        console.log("QR Code Saved Successfully!");
      }
    });
  } catch (error) {
    // response.status(500).send("Error: " + error.message);
    console("Error!");
  }
};

const updateQRcode = async (QRID) => {
  try {
    let sql =
      `UPDATE QR
    SET Flag=1
    WHERE QRid='` +
      QRID +
      `';`;

    connection.query(sql, (err, rows) => {
      if (err) {
        // response.status(500).send("Error inserting record in the database" + err.message);
        console.log("Error updating QR Code");
      } else {
        // response.send("Record Added Successfully!");
        console.log("QR Code updated successfully!");
      }
    });
  } catch (error) {
    console.log("Error!");
  }
};

const registerSchoolBus = async (schoolName, busPlates, duration) => {
  try {
    let sql =
      `INSERT INTO School_University_Buses (name,plateNumber,duration) VALUES ('` +
      schoolName +
      `','` +
      busPlates +
      `','` +
      duration +
      `');`;
    connection.query(sql, (err) => {
      if (err) {
        // response.status(500).send("Error inserting record in the database" + err.message);
        console.log("Error inserting school bus!");
      } else {
        // response.send("Record Added Successfully!");
        console.log("School bus  successfully!");
      }
    });
  } catch (error) {
    console.log("Error");
  }
};

const payService = (residentId, serviceType, amount) => {
  try {
    let sql =
      `select unitCode from Residents where residentId = '` + residentId + `';`;

    connection.query(sql, (err, rows) => {
      if (err) {
        // response.status(500).send("Error Getting first name: " + err.message);
        console.log("Error getting name");
      } else {
        const unitCode = rows[0].unitCode;
        console.log(unitCode);

        // know how to insert date into the database
        sql =
          `UPDATE ServiceTicketing set fees=fees+` +
          amount +
          `
          , payed = 1 WHERE unitCode='` +
          unitCode +
          `'
        AND types='` +
          serviceType +
          `';`;

        connection.query(sql, (err, rows) => {
          if (err) {
            console.log("Error updating record");
          } else {
            console.log("Service paid successfully!");
          }
        });
      }
    });
  } catch (error) {
    console.log("Error!");
    // response.status(500).send("Error: " + error.message);
  }
};

const payMaintenance = async (residentId) => {
  try {
    let sql =
      `select unitCode from Residents where residentId = '` + residentId + `';`;

    connection.query(sql, (err, rows) => {
      if (err) {
        // response.status(500).send("Error Getting first name: " + err.message);
        console.log("Error getting name");
      } else {
        const unitCode = rows[0].unitCode;
        console.log(unitCode);

        // know how to insert date into the database
        sql =
          `UPDATE Maintenance
        SET date=current_date() , payed=1 
        WHERE unitCode='` +
          unitCode +
          `';`;

        connection.query(sql, (err, rows) => {
          if (err) {
            // response.status(500).send("Error: " + err.message);
            console.log("Error mateeeen");
          } else {
            console.log("Mafeesh error wala haga");
            // response.send("Service requested successfully");
          }
        });
      }
    });
  } catch (error) {
    console.log("Error tani yaba");
    // response.status(500).send("Error: " + error.message);
  }
};

const saveOrder = async (order, residentId) => {
  const dataQuery = `INSERT INTO Orders (residentId, \`order\`) VALUES ('${residentId}', '${order}');`;
  let data = await sqlQuery(dataQuery);
  return data.insertId;
};

const checkDelivery = async (orderId) => {
  const dataQuery = `SELECT userResponse FROM Orders WHERE orderId = ${orderId};`;
  let data = await sqlQuery(dataQuery);
  return data[0].userResponse;
};

const respondToDelivery = async (orderId, response) => {
  const dataQuery = `UPDATE Orders SET userResponse =  '${response}' WHERE orderId = '${orderId}';`;
  await sqlQuery(dataQuery);
};

module.exports = {
  sqlQuery,
  inserInDatabase,
  arrivedVisitor,
  findCarPlate,
  queryDatabase,
  getFirstName,
  reportViolation,
  requestService,
  getIDandUnitCodeByUserName,
  getIdandFirstNameByUnitCode,
  saveQRcode,
  reportIncident,
  updateQRcode,
  payService,
  payMaintenance,
  saveOrder,
  checkDelivery,
  respondToDelivery,
  getIDUnitCodeAndUserNameByPhoneNumber,
  registerSchoolBus,
  getVisitorsByResidentId,
  getCarsByResidentId,
};
