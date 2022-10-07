const { Router } = require("express");
const whatsAppRouter = Router();
const whatsAppController=require("../../whatsapp/whatsAppController")

whatsAppRouter.post("/whatsapp",whatsAppController.whatsAppController);
whatsAppRouter.get("/whatsapp",(req, res) => {
    res.send("HI whatsApp!");
});

module.exports = whatsAppRouter;
