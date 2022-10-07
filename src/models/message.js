const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    sender: { type: String, required: true },
    userName: { type: String },
    timestamp: { type: Date, required: true },
    sessionID: { type: String, required: true },
    text: { type: String },
});

// const chatSchema= new mongoose.Schema({
//     userName:{type:String, required:true},
//     sessionID:{type:String, required:true},
//     messages:[messageSchema]
// });

const Message = mongoose.model("message", messageSchema);
module.exports = Message;