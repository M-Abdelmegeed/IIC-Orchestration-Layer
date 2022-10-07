const waServiceManager = require("./conversation-manager");
const waResultHandler = require("./core-services-manager");
const WatsonSession = require("../../models/watsonSession");

async function replyToMessageReq(userMessageInput, watsonSession, username) {
  if (
    userMessageInput.input.component &&
    userMessageInput.input.component.value
  ) {
    userMessageInput.input.text = userMessageInput.input.component.value;
    userMessageInput.input.message_type = userMessageInput.input.component.type;
  }
  //let watsonSession = await WatsonSession.find({ username: watsonSession.context.username });
  console.log("Sending to Watson: ", watsonSession);
  let waResult = await waServiceManager.sendMessageToWatson(
    userMessageInput,
    watsonSession,
    username
  );
  watsonSession.context=waResult.context.skills["main skill"].user_defined
  await watsonSession.save()
  let uiRes = await waResultHandler.simpleWAResultHandler(
    waResult,
    watsonSession
    );
  while (uiRes.sendBack) {
    console.log("Sending to Watson again:  ", watsonSession);
    let input = { input: { text: "", message_type: "text" } };
    waResult = await waServiceManager.sendMessageToWatson(
      input,
      watsonSession,
      username
    );
    uiRes = await waResultHandler.simpleWAResultHandler(
      waResult,
      watsonSession
    );
  }
  return uiRes;
}

module.exports = {
  replyToMessage: replyToMessageReq,
};
