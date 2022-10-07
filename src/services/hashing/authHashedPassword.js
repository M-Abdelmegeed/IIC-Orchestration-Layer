const bcrypt = require("bcrypt");
require("dotenv").config();

const authHashedPasswordAndInputPassword = (inputPassword, hashedPassword) => {
  return bcrypt.compareSync(inputPassword, hashedPassword);
};

module.exports = authHashedPasswordAndInputPassword;
