const generateQR = require("../../services/QR/generateQR");
const { Router } = require("express");
const validateQRCode = require("../../services/QR/validateQR");
const QRrouter = new Router();

QRrouter.post("/generate", generateQR);
QRrouter.get("/validate/:QrCodeId", validateQRCode);

module.exports = QRrouter;