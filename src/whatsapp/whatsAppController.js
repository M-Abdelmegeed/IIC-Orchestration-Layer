const twilio = require('twilio');
const waServiceManager = require("../services/watson/conversation-manager");
const Message = require("../models/message");
const getUserName = require("../services/core-services/getUserName");
const waService = require("../services/watson/wa-service");
const WhatsappSession = require("../models/whatsappSession");
const decodeToken = require("../services/authentication/decodeToken");
//const {createSession,sendMessageToWatson} = require("../controllers/sendText.controller")
const accountSid = 'AC1628b73c454851280908d4c32ef558df'; // Your Account SID from www.twilio.com/console
const authToken = 'd0b11406c8efaa64cbd7d21f7c69b73c'; // Your Auth Token from www.twilio.com/console
const databaseQueries = require("../services/database/databaseQuery")
const client = new twilio(accountSid, authToken);

const whatsAppController = async (req, res) => {
  console.log(req.body)
  //res.send("whatsapp")
  let whatsNumber = req.body.From.replace("whatsapp:", "");
  let data = await databaseQueries.getIDUnitCodeAndUserNameByPhoneNumber(whatsNumber)
  let username
  if(data)
  {  
    username = data.userName
    console.log(username)
  }
  else{
    username=false
  }
  try {

    // let data = await databaseQueries.getIDUnitCodeAndUserNameByPhoneNumber(whatsNumber)
    // const username = data.userName
    // console.log(username)
    let whatsappSession = await WhatsappSession.find({ mobileNumber: whatsNumber });
    console.log(whatsappSession)
    if (whatsappSession.length == 0) {
      whatsappSession = new WhatsappSession();
      whatsappSession.mobileNumber = whatsNumber;
      whatsappSession.sessionID = await createSession();
      whatsappSession.context = { userName: username, fromGoogleAPI: false };
      console.log("New Watson Session", whatsappSession);
    } else {
      whatsappSession = whatsappSession[0];
      console.log("Old Watson Session", whatsappSession);
    }
    await whatsappSession.save();
    let watsonReply = await sendMessageToWatson(req, whatsappSession, username);
    if (watsonReply.Error) {
      // whatsappSession = new WhatsappSession();
      whatsappSession.mobileNumber = whatsNumber;
      whatsappSession.sessionID = await createSession();
      whatsappSession.context = { userName: username, fromGoogleAPI: false };
      // console.log("New Watson Session 2", whatsappSession);
      await whatsappSession.save();
      console.log("Replaced Watson Session", whatsappSession);
      watsonReply = await sendMessageToWatson(req, whatsappSession, username);
      await whatsappSession.save();
    }
    if (watsonReply.Error) {
      const result = await sendMessageToWhatsApp("Error Communicating with Watson", whatsNumber)
      res.status(500).send("error watson")
    }
    else {
      console.log("send message to whatsapp enter")
      for(let i=0;i<watsonReply.output.length;i++)
      {
        console.log(i)
        await sendMessageToWhatsApp(watsonReply.output[i].component.text, whatsNumber)
      }
      res.status(200).send("done")
    }
  }
  catch (e) {
    const result = await sendMessageToWhatsApp("Error Communicating with Watson", whatsNumber)
    res.status(500).send("error watson")
  }
}

const createSession = async (req) => {
  const data = await waServiceManager.createSession(req).catch((e) => {
    console.error("Error: Couldn't Create Session");
    return { Error: e.message };
  });
  return data.session_id;
};

const sendMessageToWatson = async (req, whatsappSession, username) => {
  console.log("send message to watson")
  try {
    const newReq = {
      input: {
        component: {
          value: req.body.Body,
          type: "text"
        }
      }
    }
    console.log(req.body);
    const watsonRes = await waService.replyToMessage(
      newReq,
      whatsappSession,
      username
    );
    console.log("Watson Response: ", watsonRes.output.generic);
    var uiRes = {};
    uiRes.output = [];
    const newMessage = Message();
    newMessage.sender = "Alice";
    newMessage.userName = username;
    newMessage.timestamp = new Date();
    newMessage.sessionID = whatsappSession.sessionID;
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
        finalText = waOutput.title + '\n' + ''
        for (const index in waOutput.options) {
          const i = index + 1
          finalText = finalText + waOutput.options[index].value.input.text + '-' + waOutput.options[index].label + '\n' + ''
        }
        console.log(finalText)
        uiRes.output.push({
          message_type: waOutput.response_type,
          component: {
            type: waOutput.response_type,
            text: finalText,

          },
        });
        newMessage.text = uiRes.output[0].component.title;
      }
    });
    await newMessage.save();
    console.log("uiRes:",uiRes)
    return uiRes;
  } catch (e) {
    return { Error: e.message };
  }
};


const sendMessageToWhatsApp = async (body, to) => {
  console.log("whatsappmessage:", body)
  console.log("whatsappmessageto:", to)

  await client.messages
    .create({
      body: body,
      to: 'whatsapp:' + to, // Text this number
      from: 'whatsapp:+14155238886' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid)).catch((err) => console.log(err));

};

module.exports = { whatsAppController, sendMessageToWhatsApp };
