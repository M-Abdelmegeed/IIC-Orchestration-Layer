const AssistantV2 = require('ibm-watson/assistant/v2');
const { IamAuthenticator } = require('ibm-watson/auth');
const { castObject } = require('../../models/message');
const Message = require('../../models/message');
const getUserName = require('../../services/core-services/getUserName');
const decodeToken = require("../authentication/decodeToken")

const assistant = new AssistantV2({
    version: process.env.VERSION,
    authenticator: new IamAuthenticator({
        apikey: process.env.API_KEY,
    }),
    serviceUrl: process.env.SERVICE_URL,
});




function createSession(req) {
    return new Promise((resolve, reject) => {
        assistant.createSession({
            assistantId: process.env.ASSISTANT_ID
        }).then(res => {
            resolve({ "session_id": res.result.session_id });
        }).catch(err => {
            console.error(err);
            reject(new Error("Error while creating session"))
        });
    })

}
/**
 * sends user input to Watson
 * @param {*} req 
 */
function sendMessageToWatson(req, watsonSession, username) {
    //const residentId = decodeToken(req.headers.authorization);

    return new Promise(async (resolve, reject) => {
        const newMessage = Message();
        newMessage.sender = 'USER';
        newMessage.userName = username;
        newMessage.timestamp = new Date();
        newMessage.sessionID = watsonSession.sessionID;
        newMessage.text = req.input.text;
        newMessage.save();
        session_id = watsonSession.sessionID;
        assistant.message({
            assistantId: process.env.ASSISTANT_ID,
            sessionId: session_id,
            context: {
                skills: {
                    "main skill": {
                        user_defined: watsonSession.context
                    }
                }
            },
            input: {
                message_type: req.input.message_type,
                text: req.input.text,
                options: {
                    'return_context': true
                }
            }
        })
            .then(res => {
                console.log("watson response:",res.result);
                console.log(res.result.context.skills["main skill"]);
                resolve(res.result);
            })
            .catch(err => {
                console.error(err)
                reject(new Error("Error while communcating watson assistant"))
            });
    });


}



module.exports = {
    sendMessageToWatson: sendMessageToWatson,
    createSession: createSession
}