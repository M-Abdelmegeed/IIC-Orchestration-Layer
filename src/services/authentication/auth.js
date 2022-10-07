const jwt = require("jsonwebtoken");
require("dotenv").config;

const auth = (req, res, next) => {
  // TODO: get the auth token from the header
  try {
    const token = req.headers.authorization;

    if (token) {
      try {
        const verified = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        if (verified) {
          // send the token to the next function
          res.locals.token = token;
          next();
        } else {
          res
            .status(401)
            .send(`Error: failed to authenticate user by token: unvalid token`);
        }
      } catch (error) {
        res
          .status(401)
          .send(`Error: failed to authenticate user by token: ${error}`);
      }
    } else {
      res
        .status(401)
        .send(
          `Error: failed to authenticate user by token: no authentication token`
        );
    }
  } catch (error) {
    res
      .status(401)
      .send(`Error: failed to authenticate user by token: ${error}`);
  }
};

module.exports = auth;
