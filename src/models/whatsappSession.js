const { any, bool } = require("joi");
const mongoose = require("mongoose");

const whatsappSessionSchema = new mongoose.Schema({
  mobileNumber: { type: String, required: true },
  sessionID: { type: String, required: true },
//   timestamp: { type: Date, required: true },
   context: { type: Object, required: true },
});

const WhatsappSession = mongoose.model("whatsappSessions", whatsappSessionSchema);
module.exports = WhatsappSession;
