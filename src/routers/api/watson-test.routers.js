const { Router } = require("express");
const createSessionController = require("../../controllers/watson-test/create-session-controller");
const sendUserInputController = require("../../controllers/watson-test/wa-controller");

const watsonRouter = Router();

watsonRouter.post('/createSession', createSessionController);
watsonRouter.post('/sendUserInput', sendUserInputController);

module.exports = watsonRouter;