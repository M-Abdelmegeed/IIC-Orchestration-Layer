const jwt = require("jsonwebtoken");

const deocdeToken = (token) => {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buff = new Buffer(base64, "base64");
  const payloadinit = buff.toString("ascii");
  const payload = JSON.parse(payloadinit);
  return payload.residentId;
};

module.exports = deocdeToken;
