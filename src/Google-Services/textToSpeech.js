const textToSpeechAPI = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');
require('dotenv').config();



async function textToSpeech(req, res) {
  const client = new textToSpeechAPI.TextToSpeechClient();
  // const output=req.body.destination;
  // const text = ' بص يا باشا عامل ايه، انت فين دلوقتي انا جايلك علي الساعة 7 في الدقي';
  // const text2 ='انا مكدونالدز, رايح شقة 6 عند الأستاذه حبيبه ابو شعيشع و معايا شاورما اضافة توميه'
  // const outputFile = `C:/Users/ZZ01GV865/Desktop/IIC-middleware/src/resources/audioFiles/${output}.mp3`;
  // const file = fs.readFileSync('../resources/textFiles/readText.txt', 'utf8', (err, data) => {
  //     if (err) {
  //       console.error(err);
  //       return;
  //     }
  //     console.log(data);
  //     return data;
  //   });
  const text = req.body.input.component.value;

  const request = {
    input: { text: text },
    voice: { languageCode: 'ar-EG', ssmlGender: 'FEMALE' },
    audioConfig: { audioEncoding: 'MP3' },
  };
  const [response] = await client.synthesizeSpeech(request);
  // const writeFile = util.promisify(fs.writeFile);
  console.log(response.audioContent.toString('base64'));
  const encodedAudio = response.audioContent.toString('base64')
  res.send({
    encodedAudio: encodedAudio
  })
}


module.exports = textToSpeech;
