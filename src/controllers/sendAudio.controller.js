const speech = require("@google-cloud/speech");
const textToSpeechAPI = require("@google-cloud/text-to-speech");
const fs = require("fs");
const sendTextController = require("./sendText.controller");
require("dotenv").config();

async function sendAudioController(req, res, next) {
  try {
    const client = new speech.SpeechClient();
    const audioBytes = req.body.audioEncoded.toString("base64");

    const audio = {
      content: audioBytes,
    };

    // let config;
    const config = {
      encoding: "AMR",
      sampleRateHertz: 8000,
      languageCode: "ar-EG",
    };

    const request = { audio, config };

    const [response] = await client.recognize(request);
    let transcription = response.results
      .map((result) => result.alternatives[0].transcript)
      .join("/n");

    console.log(transcription);

    let obj, text, orderId;

    // google apis didn't transform the speech to text
    if (!transcription) {
      obj = "كرر المحاولة من فضلك";
    } else {
      const textReq = {
        component: {
          value: transcription,
          type: "text",
        },
      };

      req.body.input = textReq;

      obj = await sendTextController(req, res, next);
      console.log("Obj: ", obj);
      text = obj.text;

      if (text) {
        console.log(`Transcript: ${transcription}`);
        console.log(text);
      } else {
        text = "حدث خطأ, حاول مرة أخرة";
      }
    }
    console.log(`Transcript: ${transcription}`);
    console.log(text);

    const client2 = new textToSpeechAPI.TextToSpeechClient();
    const request2 = {
      input: { text },
      voice: { languageCode: "ar-EG", ssmlGender: "FEMALE" },
      audioConfig: { audioEncoding: "MP3" },
    };
    const [response2] = await client2.synthesizeSpeech(request2);
    const encodedAudio = response2.audioContent.toString("base64");

    if (obj.orderId == null || obj.orderId == undefined) {
      res.send({ encodedAudio, orderId: "", transcription, obj });
    } else {
      res.send({ encodedAudio, orderId, transcription, obj });
    }
  } catch (err) {
    console.error(err);
    res.status(500).send(`ERROR: ${err}`);
  }
}

module.exports = sendAudioController;
