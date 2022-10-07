const { Router } = require("express");
const getPlates = require("../../services/image/getPlates");
const imageRouter = Router();

imageRouter.post("/plates", getPlates);

module.exports = imageRouter;