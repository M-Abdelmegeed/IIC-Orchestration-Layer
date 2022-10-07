const { Router } = require("express");
const googleRouter = Router();
const speechToText = require('../../Google-Services/speechToText');
const textToSpeech = require("../../Google-Services/textToSpeech");

googleRouter.post("/speechToText", speechToText);
googleRouter.post("/textToSpeech", textToSpeech);

module.exports = googleRouter;