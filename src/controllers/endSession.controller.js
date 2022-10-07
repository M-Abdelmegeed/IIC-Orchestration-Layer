const waServiceManager = require("../services/watson/conversation-manager");
const Message = require("../models/message");
const getUserName = require("../services/core-services/getUserName");
const waService = require("../services/watson/wa-service");
const WatsonSession = require("../models/watsonSession");
const decodeToken = require("../services/authentication/decodeToken");

const endSessionController=async(req,res,next)=>{
    try { 
        let username=""
        if (req.body.delivery) {
            username = "Delivery";
          } else {
            const residentId = decodeToken(req.headers.authorization);
            username = await getUserName(residentId);
          }
          let clearSession= await WatsonSession.deleteMany({username:username})
          console.log(clearSession)
          if (clearSession.deletedCount>0)
          {
            res.status(200).send("session deletes")
          }
          else
          {
            res.status(404).send("session not found")
          }

        }
        catch(err)
        {
            console.log(err)
            res.status(400).send("can't delete session")
        }
    }

module.exports = endSessionController;