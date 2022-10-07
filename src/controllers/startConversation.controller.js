const waServiceManager = require("../services/watson/conversation-manager");
const Message = require("../models/message");
const getUserName = require("../services/core-services/getUserName");
const waService = require("../services/watson/wa-service");
const WatsonSession = require("../models/watsonSession");
const decodeToken = require("../services/authentication/decodeToken")

const startConversationController = async (req, res, next) => {
    const residentId = decodeToken(req.headers.authorization);

    let username = await getUserName(residentId);
    let watsonSession = await WatsonSession.find({ userName: username });
    watsonSession = new WatsonSession();
    watsonSession.username = username;
    watsonSession.timestamp = new Date();
    watsonSession.sessionID = await createSession();
    watsonSession.context = { userName: username };
    await watsonSession.save();
    req.body = { input: { component: { value: "", type: "text" } } };
    let watsonReply = await sendMessageToWatson(req, watsonSession, username);
    if (watsonReply.Error) {
        res.status(500);
        res.json({
            Error: {
                error_message: "Error Communicating with Watson",
                http_status_code: "500",
            },
        });
    } else {
        res.json(watsonReply);
    }
};

const createSession = async (req) => {
    const data = await waServiceManager.createSession(req).catch((e) => {
        console.error("Error: Couldn't Create Session");
        return { Error: e.message };
    });
    return data.session_id;
};

const sendMessageToWatson = async (req, watsonSession, username) => {
    try {
        console.log(req.body);
        const watsonRes = await waService.replyToMessage(req.body, watsonSession);
        console.log("Watson Response: ", watsonRes.output.generic[0]);
        var uiRes = {};
        uiRes.output = [];
        const newMessage = Message();
        newMessage.sender = "Alice";
        newMessage.userName = username;
        newMessage.timestamp = new Date();
        newMessage.sessionID = watsonSession.sessionID;
        watsonRes.output.generic.forEach((waOutput) => {
            if (waOutput.response_type == "text") {
                uiRes.output.push({
                    message_type: waOutput.response_type,
                    component: {
                        type: waOutput.response_type,
                        text: waOutput.text,
                    },
                });
                newMessage.text = uiRes.output[0].component.text;
            } else if (waOutput.response_type == "option") {
                uiRes.output.push({
                    message_type: waOutput.response_type,
                    component: {
                        type: waOutput.response_type,
                        title: waOutput.title,
                        options: waOutput.options,
                    },
                });
                newMessage.text = uiRes.output[0].component.title;
            }
        });
        await newMessage.save();
        return uiRes;
    } catch (e) {
        return { Error: e.message };
    }
};

module.exports = startConversationController;
