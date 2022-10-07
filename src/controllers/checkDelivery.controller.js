const { checkDelivery } = require("../services/database/databaseQuery");
const textToSpeechAPI = require("@google-cloud/text-to-speech");
require("dotenv").config();

// api/v1/checkDelivery
const checkDeliveryController = async (req, res, next) => {
  const orderId = req.body.orderId;

  let userResponse = await checkDelivery(orderId);
  let obj = "";
  if (userResponse == null) {
    res.status(200).send("");
    return;
  } else if (userResponse == "yes") {
    obj = "تفضل، يمكنك الدخول";
  } else if (userResponse == "no") {
    obj = "عفوًا لقد تم رفض طلبك، برجاء التأكد من الطلب و رقم الوحدة";
  }
  console.log(obj);
  if (obj) {
    const client = new textToSpeechAPI.TextToSpeechClient();
    const request = {
      input: { text: obj },
      voice: { languageCode: "ar-EG", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };
    const [response2] = await client.synthesizeSpeech(request);
    const encodedAudio = response2.audioContent.toString("base64");
    res.send(encodedAudio);
  } else {
    res.status(500).send("Internal Error");
  }
};

module.exports = checkDeliveryController;
