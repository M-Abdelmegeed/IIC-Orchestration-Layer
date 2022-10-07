const waServiceManager = require("../services/watson/conversation-manager");
const Message = require("../models/message");
const getUserName = require("../services/core-services/getUserName");
const waService = require("../services/watson/wa-service");
const WatsonSession = require("../models/watsonSession");
const decodeToken = require("../services/authentication/decodeToken");
const createSession = require("../services/watson/createSession");


const sendTextController = async (req, res, next) => {
  try {
    let username = "";
    if (req.body.delivery) {
      username = "Delivery";
    } else {
      const residentId = decodeToken(req.headers.authorization);
      username = await getUserName(residentId);
    }
    let watsonSession = await WatsonSession.find({ username: username });
    if (watsonSession.length == 0) {
      watsonSession = new WatsonSession();
      watsonSession.username = username;
      watsonSession.timestamp = new Date();
      watsonSession.sessionID = await createSession();
      watsonSession.context = { userName: username };
      console.log("New Watson Session", watsonSession);
    } else {
      watsonSession = watsonSession[0];
      console.log("Old Watson Session", watsonSession);
    }

    if (req.body.delivery) {
      watsonSession.context.fromGoogleAPI = true;
      watsonSession.context._order_ = "";
      watsonSession.context._unitCode_ = "";
    } else {
      watsonSession.context.fromGoogleAPI = false;
    }
    await watsonSession.save();
    let watsonReply = await sendMessageToWatson(req, watsonSession, username);
    if (watsonReply.Error) {
      watsonSession.username = username;
      watsonSession.timestamp = new Date();
      watsonSession.sessionID = await createSession();
      watsonSession.context = { userName: username };
      await watsonSession.save();
      console.log("Replaced Watson Session", watsonSession);
      if (req.body.delivery) {
        watsonSession.context.fromGoogleAPI = true;
        watsonSession.context._order_ = "";
        watsonSession.context._unitCode_ = "";
      } else {
        watsonSession.context.fromGoogleAPI = false;
      }
      watsonReply = await sendMessageToWatson(req, watsonSession, username);
      await watsonSession.save();
    }
    if (watsonReply.Error) {
      res.status(500);
      res.json({
        Error: {
          error_message: "حدث خطأ، برجاء المحاولة مرة أخرى",
          http_status_code: "500",
        },
      });
    } 
    else {
      if (req.body.delivery) {
        return {
          text: watsonReply.output[0].component.text,
          orderId: watsonReply.orderId,
        };
      }
      res.json(watsonReply);
      console.log(watsonReply.output[0].component.text);
    }
  } catch (error) {
    if (!res.headersSent) {
    res.status(500).send("حدث خطأ، برجاء المحاولة مرة أخرى");
      }  }
};

const sendMessageToWatson = async (req, watsonSession, username) => {
  try {
    const watsonRes = await waService.replyToMessage(
      req.body,
      watsonSession,
      username
    );
    var uiRes = {};
    if (!!watsonRes.orderId) {
      uiRes.orderId = watsonRes.orderId;
    }
    uiRes.output = [];
    const newMessage = Message();
    newMessage.sender = "Alice";
    newMessage.userName = username;
    newMessage.timestamp = new Date();
    newMessage.sessionID = watsonSession.sessionID;
    watsonRes.output.generic.forEach((waOutput) => {
      if (waOutput.response_type === "text") {
        uiRes.output.push({
          message_type: waOutput.response_type,
          component: {
            type: waOutput.response_type,
            text: waOutput.text,
          },
        });
        newMessage.text = uiRes.output[uiRes.output.length - 1].component.text;
      } else if (waOutput.response_type === "option") {
        uiRes.output.push({
          message_type: waOutput.response_type,
          component: {
            type: waOutput.response_type,
            title: waOutput.title,
            options: waOutput.options,
          },
        });
        newMessage.text = uiRes.output[uiRes.output.length - 1].component.title;
      } else {
        uiRes.output.push({
          message_type: "text",
          component: {
            type: "text",
            text: "لم أفهم قصدك",
          },
        });
      }
    });
    await newMessage.save();
    console.log("uiRes", uiRes);
    return uiRes;
  } catch (e) {
    return { Error: e.message };
  }
};

module.exports = sendTextController;
