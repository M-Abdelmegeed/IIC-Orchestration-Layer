const jwt = require("jsonwebtoken");
require("dotenv").config;

const registerAndReturnToken = (username, email, password) => {
  try {
    // TODO: add them to the database
    // return the token;
    const data = { username, email, password };

    // creating the jwt token
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

    return token;
  } catch (err) {
    console.error(err);
    return;
  }
};

module.exports = registerAndReturnToken;
