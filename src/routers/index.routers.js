const express = require("express");
const router = express.Router();
const phoneRoutes = require("./api/phone.routers");
const watsonRoutes = require("./api/watson-test.routers");
const GoogleRoutes = require("./api/google.routers");
const imageRoutes = require('./api/image.routers');
const QRrouter = require("./api/qr.routers");
const whatsAppRouter=require("./api/whatsapp.routers")

router.use("/api/v1", phoneRoutes);
router.use("/api/v1", whatsAppRouter)
router.use("/api/v1", watsonRoutes);
router.use("/google-services", GoogleRoutes);
router.use("/image-processing", imageRoutes);
router.use("/qr", QRrouter)
;
module.exports = router;
