const QRCodemodel = require("../../models/QRcode");
const { updateQRcode } = require("../database/databaseQuery");

const validateQRCode = async (req, res) => {
    const QrCodeId = req.params.QrCodeId;
    const query = { QRid: QrCodeId, flag: 0 };
    const QR = await QRCodemodel.findOne(query);

    if (QR == null) {
        res.redirect("https://iic-access-denied.netlify.app")
    } else {
        await QRCodemodel.findOneAndUpdate(query, { $set: { flag: 1 } })
        await updateQRcode(QrCodeId)
        res.redirect("https://iic-access-granted.netlify.app");
    }
}
module.exports = validateQRCode