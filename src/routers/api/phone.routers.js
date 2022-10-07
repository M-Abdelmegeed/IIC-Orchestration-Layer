const { Router } = require("express");
const auth = require("../../services/authentication/auth");
const registerRouter = require("./register.routers");
const forgotPasswordRouter = require("./forgotPassword.routers");
const loginController = require("../../controllers/login.controller");
const sendTextController = require("../../controllers/sendText.controller");
const sendImageController = require("../../controllers/sendImage.controller");
const sendAudioController = require("../../controllers/sendAudio.controller");
const showVisitorsController = require("../../controllers/showVisitors.controller");
const requestServiceController = require("../../controllers/requestService.controller");
const reportIncidentController = require("../../controllers/reportIncident.controller");
const reportViolationController = require("../../controllers/reportViolation.controller");
const getFirstNameController = require("../../controllers/getFirstName.controller");
const payServiceController = require("../../controllers/payService.controller");
const payMaintenanceController = require("../../controllers/payMaintenance.controller");
const deliveryController = require("../../controllers/delivery.controller");
const checkDeliveryController = require("../../controllers/checkDelivery.controller");
const registerBusController = require("../../services/core-services/School Bus/registerBus");
const endSessionController=require("../../controllers/endSession.controller")
const getVisitorsArrayController=require("../../controllers/getVisitorsArray.controller")
const getCarsArrayController=require("../../controllers/getCarsArray.controller")

const phoneRouter = Router();

// pass Router as there are many routes under registerRouter
phoneRouter.use("/register", registerRouter); 

// pass Router as there are many routes under forgotPassword
phoneRouter.use("/forgotPassword", forgotPasswordRouter);

phoneRouter.post("/endSession", endSessionController);

phoneRouter.get("/visitorsList",getVisitorsArrayController)

phoneRouter.get("/cars",getCarsArrayController)  
//phoneRouter.post("/endSession", endSessionController);

phoneRouter.post("/login", loginController);

// the auth function is to authenticate user by JWT token before performing any actions
phoneRouter.post("/sendImage", auth, sendImageController);

phoneRouter.post("/sendText", auth, sendTextController);

phoneRouter.post("/sendAudio", sendAudioController);

phoneRouter.post("/requestService", auth, requestServiceController);

phoneRouter.post("/reportIncident", auth, reportIncidentController);

phoneRouter.get("/getFirstName", auth, getFirstNameController);

phoneRouter.post("/reportViolation", auth, reportViolationController);

phoneRouter.get("/showVisitors", auth, showVisitorsController);

phoneRouter.post("/payService", auth, payServiceController);

phoneRouter.post("/payMaintenance", auth, payMaintenanceController);

phoneRouter.post("/respondToDelivery", deliveryController);

phoneRouter.post("/checkDelivery", checkDeliveryController);

phoneRouter.post("/registerBus", registerBusController);

module.exports = phoneRouter;
