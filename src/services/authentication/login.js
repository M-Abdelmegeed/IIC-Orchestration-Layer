const jwt = require("jsonwebtoken");
require("dotenv").config;

const generateToken = (username, email, password) => {
  try {
    // payload in the jwt token
    const data = { username, email, password };

    // the generated jwt token
    const token = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET);

    return token;
  } catch (error) {
    console.error(error);
  }
};

module.exports = generateToken;
