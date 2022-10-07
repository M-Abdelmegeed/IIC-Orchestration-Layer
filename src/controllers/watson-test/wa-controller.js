const express = require('express');
const Message = require('../../models/message');
const getUserName = require('../../services/core-services/getUserName');
const router = express.Router();
const waService = require('../../services/watson/wa-service');
const sendMessageToWatson = require('../../services/watson/conversation-manager')
const decodeToken = require("../../services/authentication/decodeToken")



const sendUserInputController = async (req, res, next) => {
    const residentId = decodeToken(req.headers.authorization);
    try {
        const watsonRes = await waService.replyToMessage(req.body);
        var uiRes = {};
        uiRes.output = [];
        watsonRes.output.generic.forEach(waOutput => {
            uiRes.output.push({
                message_type: waOutput.response_type,
                component: {
                    type: waOutput.response_type,
                    text: waOutput.text
                }
            });
        });
        const newMessage = Message();
        newMessage.sender = 'Alice';
        newMessage.userName = await getUserName(residentId);
        newMessage.timestamp = new Date();
        newMessage.sessionID = req.body.session_id;
        newMessage.text = uiRes.output[0].component.text;
        await newMessage.save();
        res.json(uiRes);
    }
    catch (e) {
        console.error('Error message  ' + e.message);
        if (e.status) {//if status is null means that this is internal error
            res.status(e.status);
            return res.json({ Error: { error_message: e.message, http_status_code: e.status } });
        } else {
            res.status(500);
            return res.json({ Error: { error_message: e.message, http_status_code: '500' } });
        }
    }
};



module.exports = sendUserInputController
