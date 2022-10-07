const { any, bool } = require("joi");
const mongoose = require("mongoose");

const watsonSessionSchema = new mongoose.Schema({
  username: { type: String, required: true },
  sessionID: { type: String, required: true },
  timestamp: { type: Date, required: true },
  context: { type: Object, required: true },
});

const WatsonSession = mongoose.model("watsonsessions", watsonSessionSchema);
module.exports = WatsonSession;
