const mongoose = require('mongoose');

const QRSchema = new mongoose.Schema({
    QRid: { type: String, required: true },
    flag: { type: Boolean, required: true },
    timestamp: { type: Date, required: true },
});

const QRCode = mongoose.model("QRcode", QRSchema);
module.exports = QRCode;