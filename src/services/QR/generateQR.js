const QRCodemodel = require("../../models/QRcode");
const { saveQRcode } = require("../database/databaseQuery");

const generateQR = (req, res) => {
  const QRCode = require("qrcode");
  // Print the QR code to terminal
  const QRID = Math.floor(100000 + Math.random() * 900000).toString();
  saveQRcode(QRID);
  const newQRcode = QRCodemodel();
  newQRcode.QRid = QRID;
  newQRcode.flag = 0;
  newQRcode.timestamp = new Date();
  newQRcode.save();

  // res.write("QR-code ID: " + QRID)

  QRCode.toString(
    `https://iic-middleware.mybluemix.net/qr/validate/${QRID}`,
    { type: "terminal" },
    function (err, QRcode) {
      if (err) return console.error("error occurred");

      // Printing the generated code
      console.log(QRcode);
    }
  );

  // Converting the data into base64
  QRCode.toDataURL(
    `https://iic-middleware.mybluemix.net/qr/validate/${QRID}`,
    function (err, code) {
      if (err) return console.error("error occurred");

      // Printing the code
      const base64 = code.split(",");
      console.log(base64[1]);
      res.send(base64[1]);
    }
  );
};

module.exports = generateQR;
