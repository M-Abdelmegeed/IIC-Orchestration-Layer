// const greeting = require('../core-services/greeting');
// const ownerRegisterCar = require('../core-services/ownerRegisterCar');
// const visitorRegisterCar = require('../core-services/visitorRegisterCar');
// const taxiRegisterCar = require('../core-services/taxiRegisterCar');
// const familyRegister = require('../core-services/familyRegister');
// const { getIdandFirstNameByUnitCode, saveOrder, checkDelivery } = require('../database/databaseQuery');
// const sendNotification = require('../core-services/sendNotification');
// const WatsonSession = require('../../models/watsonSession');
// const createSession = require('./createSession');
// const { duration } = require('moment');


// async function simpleWAResultHandler(waResult, watsonSession) {
//   var userDefinedcontext = waResult.context.skills["main skill"].user_defined;
//   userDefinedcontext.backEndError = false;
//   if (userDefinedcontext && userDefinedcontext.action) {
//     console.log('Action: ', userDefinedcontext.action);
//     if (userDefinedcontext.action == "greeting") {
//       await handleGreeting(waResult, watsonSession);
//     } else if (userDefinedcontext.action == "ownerRegisterCar") {
//       return await handleOwnerRegisterCar(userDefinedcontext, watsonSession);
//     } else if (userDefinedcontext.action == "visitorRegisterCar") {
//       return await handleVisitorRegisterCar(userDefinedcontext, watsonSession);
//     } else if (userDefinedcontext.action == "taxiRegisterCar") {
//       return await handleTaxiRegisterCar(userDefinedcontext, watsonSession);
//     } else if (userDefinedcontext.action == "familyRegistration") {
//       return await handleFamilyRegistration(userDefinedcontext, watsonSession)
//     } else if (userDefinedcontext.action == "extentVisitorRegisterCar") {
//       return await handleExtentVisitorRegisterCar()
//     } else if (userDefinedcontext.action == "sendNotification") {
//       let orderId = await handleDelivery(userDefinedcontext, watsonSession, waResult);
//       if (!orderId) return waResult;
//       waResult.orderId = orderId;
//       console.log('Order ID: ', orderId);
//     }
//   }
//   watsonSession.context = userDefinedcontext;
//   return waResult;
// }

// const handleFamilyRegistration = async (userDefinedcontext, watsonSession) => {
//   //_name_,_age_,_phoneNumber_
//   memberObj = {
//     _name_: userDefinedcontext._name_,
//     _age_: userDefinedcontext._age_,
//     _phoneNumber_: userDefinedcontext._phoneNumber_
//   }
//   console.log(memberObj)
//   try {
//     const res = await familyRegister(memberObj, userDefinedcontext.userName);
//     if (res) {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = false;
//     }
//     else {
//       userDefinedcontext.alreadySaved = true;
//       userDefinedcontext.backEndError = true;
//     }
//   } catch (e) {
//     userDefinedcontext.backEndError = true;
//     userDefinedcontext.alreadySaved = false;
//     console.log('backEndError');
//   }
//   userDefinedcontext.action = "";
//   watsonSession.context = userDefinedcontext;
//   return { sendBack: true };
// }

// // const handleextentVisitorRegisterCar = async (userDefinedcontext, watsonSession) => {
// //   //_name_,_age_,_phoneNumber_
// //   memberObj = {
// //     _name_: userDefinedcontext._name_,
// //     _age_: userDefinedcontext._age_,
// //     _phoneNumber_: userDefinedcontext._phoneNumber_
// //   }
// //   console.log(memberObj)
// //   try {
// //     const res = await familyRegister(memberObj, userDefinedcontext.userName);
// //     if (res) {
// //       userDefinedcontext.alreadySaved = false;
// //       userDefinedcontext.backEndError = false;
// //     }
// //     else {
// //       userDefinedcontext.alreadySaved = true;
// //       userDefinedcontext.backEndError = true;
// //     }
// //   } catch (e) {
// //     userDefinedcontext.backEndError = true;
// //     userDefinedcontext.alreadySaved = false;
// //     console.log('backEndError');
// //   }
// //   userDefinedcontext.action = "";
// //   watsonSession.context = userDefinedcontext;
// //   return { sendBack: true };
// // }

// const handleGreeting = async (waResult, watsonSession) => {
//   console.log(waResult.output.generic[0].text);
//   waResult.output.generic[0].text = await greeting(waResult.output.generic[0].text, watsonSession.context.userName);
// }

// const handleOwnerRegisterCar = async (userDefinedcontext, watsonSession) => {
//   try {
//     userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
//     const res = await ownerRegisterCar(userDefinedcontext._carPlate_, userDefinedcontext.userName);
//     if (res) {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = false;
//     }
//     else {
//       userDefinedcontext.alreadySaved = true;
//       userDefinedcontext.backEndError = true;
//     }
//   } catch (e) {
//     userDefinedcontext.backEndError = true;
//     userDefinedcontext.alreadySaved = false;
//     console.log('backEndError');
//   }
//   userDefinedcontext.action = "";
//   watsonSession.context = userDefinedcontext;
//   return { sendBack: true };
// }

// const handleVisitorRegisterCar = async (userDefinedcontext, watsonSession) => {
//   try {
//     console.log("handleVisitorResgisterCar")
//     userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
//     console.log(userDefinedcontext._duration_)
//     const duration = await convertFromArabicToEnglish(userDefinedcontext._duration_)
//     const res = await visitorRegisterCar(userDefinedcontext._carPlate_, duration, userDefinedcontext.userName);
//     if (res == "updated") {
//       userDefinedcontext.alreadySaved = true;
//       userDefinedcontext.backEndError = false
//     }
//     else if (res) {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = false;
//     }
//     else {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = true;
//     }
//   } catch (e) {
//     userDefinedcontext.backEndError = true;
//     userDefinedcontext.alreadySaved = false;
//     console.log('backEndError');
//   }
//   userDefinedcontext.action = "";
//   watsonSession.context = userDefinedcontext;
//   return { sendBack: true };
// }

// const handleTaxiRegisterCar = async (userDefinedcontext, watsonSession) => {
//   try {
//     userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
//     const res = await taxiRegisterCar(userDefinedcontext._carPlate_, userDefinedcontext.userName);
//     if (res) {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = false;
//     }
//     else {
//       userDefinedcontext.alreadySaved = true;
//       userDefinedcontext.backEndError = true;
//     }
//   } catch (e) {
//     userDefinedcontext.backEndError = true;
//     userDefinedcontext.alreadySaved = false;
//     console.log('backEndError');
//   }
//   userDefinedcontext.action = "";
//   watsonSession.context = userDefinedcontext;
//   return { sendBack: true };
// }

// const handleDelivery = async (userDefinedcontext, watsonSession, waResult) => {
//   let order = userDefinedcontext._order_;
//   let unitCode = userDefinedcontext._unitCode_;
//   if (unitCode.length == 2) {
//     unitCode = unitCode[0] + '0' + unitCode[1];
//   }
//   const data = await getIdandFirstNameByUnitCode(unitCode);

//   if (data) {
//     const residentId = data.residentId;
//     const firstName = data.firstName;
//     if (!order) order = 'A restaurant/courier';

//     // save order
//     let orderId = await saveOrder(order, residentId);
//     console.log('Saved Order with ID: ' + orderId);
//     sendNotification(residentId, firstName, order, orderId);

//     userDefinedcontext.action = "";
//     watsonSession.context = userDefinedcontext;
//     // return { sendBack: true };

//     return orderId;
//   } else {
//     userDefinedcontext.action = "";
//     waResult.output.generic[0].text = 'هذه الوحدة غير مسجلة، برجاء المحاولة مرة أخرى';
//     watsonSession = new WatsonSession();
//     watsonSession.username = 'Delivery';
//     watsonSession.timestamp = new Date();
//     watsonSession.sessionID = await createSession();
//     watsonSession.context = { userName: 'Delivery', fromGoogleAPI: true };
//     return null;

//   }
// }


// const formatCarPlate=async(carPlate)=>{
//   function chars (string) {  
//     return Array.from(
//       String(string)
//       )
//     }
//     let plateArray= chars(carPlate)
//     let spaceBeforeIt=true
//     let formatedCarPlate=''
//     for (let i = 0; i < plateArray.length; i++) {
//       if (i==0 && plateArray[i]==' ')
//       {
//       }
//       else{
//         if (spaceBeforeIt==true&&plateArray[i]!=' ')
//         {
//           formatedCarPlate=formatedCarPlate+plateArray[i]
//           spaceBeforeIt=false
//         }
//         else if (spaceBeforeIt==false && plateArray[i]!=' ')
//         {
//           formatedCarPlate=formatedCarPlate+' '
//           formatedCarPlate=formatedCarPlate+plateArray[i]
//           spaceBeforeIt=false
//         }
//         else if (spaceBeforeIt==false && plateArray[i]==' '){
//           formatedCarPlate=formatedCarPlate+' '
//           spaceBeforeIt=true
//         }
//       }
//     }
//     console.log(plateArray)
//     console.log(formatedCarPlate)
//     return formatedCarPlate
//   }

//   const convertFromArabicToEnglish=async(duration)=>
//   {
//     console.log(typeof(duration))
//     console.log(typeof duration)
//     return duration

//   }

// module.exports = {
//   simpleWAResultHandler: simpleWAResultHandler,
// };







const greeting = require('../core-services/greeting');
const ownerRegisterCar = require('../core-services/ownerRegisterCar');
const visitorRegisterCar = require('../core-services/visitorRegisterCar');
const taxiRegisterCar = require('../core-services/taxiRegisterCar');
const familyRegister = require('../core-services/familyRegister');
const { getIdandFirstNameByUnitCode, saveOrder, checkDelivery } = require('../database/databaseQuery');
const sendNotification = require('../core-services/sendNotification');
const WatsonSession = require('../../models/watsonSession');
const createSession = require('./createSession');
const { from } = require('pumpify');
const { duration } = require('moment');


async function simpleWAResultHandler(waResult, watsonSession) {
  var userDefinedcontext = waResult.context.skills["main skill"].user_defined;
  userDefinedcontext.backEndError = false;
  if (userDefinedcontext && userDefinedcontext.action) {
    console.log('Action: ', userDefinedcontext.action);
    if (userDefinedcontext.action == "greeting") {
      await handleGreeting(waResult, watsonSession);
    } else if (userDefinedcontext.action == "ownerRegisterCar") {
      return await handleOwnerRegisterCar(userDefinedcontext, watsonSession);
    } else if (userDefinedcontext.action == "visitorRegisterCar") {
      return await handleVisitorRegisterCar(userDefinedcontext, watsonSession);
    } else if (userDefinedcontext.action == "taxiRegisterCar") {
      return await handleTaxiRegisterCar(userDefinedcontext, watsonSession);
    } else if (userDefinedcontext.action == "familyRegistration") {
      console.log("family reg")
      return await handleFamilyRegistration(userDefinedcontext, watsonSession)
    } else if(userDefinedcontext.action=="checkAge") {
      return await checkAgeActions(userDefinedcontext, watsonSession)
    // } else if (userDefinedcontext.action == "extentVisitorRegisterCar") {
    //   return await handleExtentVisitorRegisterCar()
    } else if (userDefinedcontext.action == "sendNotification") {
      let orderId = await handleDelivery(userDefinedcontext, watsonSession, waResult);
      if (!orderId) return waResult;
      waResult.orderId = orderId;
      console.log('Order ID: ', orderId);
    }
  }
  watsonSession.context = userDefinedcontext;
  return waResult;
}

const checkAgeActions = async(userDefinedcontext,watsonSession)=>{
  const newAge=await toEnglishNumber(userDefinedcontext._age_)
  const isTrue=await isNumeric(newAge)
  if (isTrue==false)
  {
    userDefinedcontext._ageNotTrue_=true
  }
  else 
  {
    userDefinedcontext._ageNotTrue_=false
  }
  userDefinedcontext.action = "";
  watsonSession.context = userDefinedcontext;
  return { sendBack: true };
}

const handleFamilyRegistration = async (userDefinedcontext, watsonSession) => {
  //_name_,_age_,_phoneNumber_
  console.log("handle family reg")
  // const x = await fromArabicToEnglish(userDefinedcontext._age_)
  // const y = await fromArabicToEnglish(userDefinedcontext._phoneNumber_)
  const newPhoneNumber=await toEnglishNumber(userDefinedcontext._phoneNumber_)
  const newAge=await toEnglishNumber(userDefinedcontext._age_)
  // const isTrue=await isNumeric(newAge)
  const check = await checkValidationOnPhoneNumber(newPhoneNumber)
  if (check==false)
  {
    userDefinedcontext._phoneNumberNotTrue_=true;
    userDefinedcontext.action = "";
    userDefinedcontext.backEndError = false;
    userDefinedcontext.alreadySaved = false;
    watsonSession.context = userDefinedcontext;
    return { sendBack: true };
  }
  memberObj = {
    _name_: userDefinedcontext._name_,
    _age_: newAge,
    _phoneNumber_: newPhoneNumber
  }
  console.log(memberObj)
  try {
    const res = await familyRegister(memberObj, userDefinedcontext.userName);
    if (res) {
    userDefinedcontext._phoneNumberNotTrue_=false;
      userDefinedcontext.alreadySaved = false;
      userDefinedcontext.backEndError = false;
      // userDefinedcontext._phoneNumber_='0'+userDefinedcontext._phoneNumber_
    }
    else {
      userDefinedcontext.alreadySaved = true;
      userDefinedcontext.backEndError = true;
    userDefinedcontext._phoneNumberNotTrue_=false;

    }
  } catch (e) {
    userDefinedcontext.backEndError = true;
    userDefinedcontext.alreadySaved = false;
    console.log('backEndError');
  }
  userDefinedcontext.action = "";
  watsonSession.context = userDefinedcontext;
  return { sendBack: true };
}
// const handleextentVisitorRegisterCar = async (userDefinedcontext, watsonSession) => {
//   //_name_,_age_,_phoneNumber_
//   memberObj = {
//     _name_: userDefinedcontext._name_,
//     _age_: userDefinedcontext._age_,
//     _phoneNumber_: userDefinedcontext._phoneNumber_
//   }
//   console.log(memberObj)
//   try {
//     const res = await familyRegister(memberObj, userDefinedcontext.userName);
//     if (res) {
//       userDefinedcontext.alreadySaved = false;
//       userDefinedcontext.backEndError = false;
//     }
//     else {
//       userDefinedcontext.alreadySaved = true;
//       userDefinedcontext.backEndError = true;
//     }
//   } catch (e) {
//     userDefinedcontext.backEndError = true;
//     userDefinedcontext.alreadySaved = false;
//     console.log('backEndError');
//   }
//   userDefinedcontext.action = "";
//   watsonSession.context = userDefinedcontext;
//   return { sendBack: true };
// }
const handleGreeting = async (waResult, watsonSession) => {
  console.log(waResult.output.generic[0].text);
  waResult.output.generic[0].text = await greeting(waResult.output.generic[0].text, watsonSession.context.userName);
}
const handleOwnerRegisterCar = async (userDefinedcontext, watsonSession) => {
  try {
    userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
    const res = await ownerRegisterCar(userDefinedcontext._carPlate_, userDefinedcontext.userName);
    if (res) {
      userDefinedcontext.alreadySaved = false;
      userDefinedcontext.backEndError = false;
    }
    else {
      userDefinedcontext.alreadySaved = true;
      userDefinedcontext.backEndError = true;
    }
  } catch (e) {
    userDefinedcontext.backEndError = true;
    userDefinedcontext.alreadySaved = false;
    console.log('backEndError');
  }
  userDefinedcontext.action = "";
  watsonSession.context = userDefinedcontext;
  return { sendBack: true };
}
const handleVisitorRegisterCar = async (userDefinedcontext, watsonSession) => {
  try { 
    console.log("handleVisitorResgisterCar")
    console.log("car plate before:",userDefinedcontext._carPlate_)
    userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
    console.log(userDefinedcontext._duration_)
    console.log("formated car pate:",userDefinedcontext._carPlate_)
    const res = await visitorRegisterCar(userDefinedcontext._carPlate_, userDefinedcontext._duration_, userDefinedcontext.userName);
    //const duration = await convertFromArabicToEnglish(userDefinedcontext._duration_)
    //const res = await visitorRegisterCar(userDefinedcontext._carPlate_, duration, userDefinedcontext.userName);
    if (res == "updated") {
      userDefinedcontext.alreadySaved = true;
      userDefinedcontext.backEndError = false
    }
    else if (res) {
      userDefinedcontext.alreadySaved = false;
      userDefinedcontext.backEndError = false;
    }
    else {
      userDefinedcontext.alreadySaved = false;
      userDefinedcontext.backEndError = true;
    }
  } catch (e) {
    userDefinedcontext.backEndError = true;
    userDefinedcontext.alreadySaved = false;
    console.log('backEndError');
  }
  userDefinedcontext.action = "";
  watsonSession.context = userDefinedcontext;
  return { sendBack: true };
}
const handleTaxiRegisterCar = async (userDefinedcontext, watsonSession) => {
  try {
    userDefinedcontext._carPlate_= await formatCarPlate(userDefinedcontext._carPlate_)
    const res = await taxiRegisterCar(userDefinedcontext._carPlate_, userDefinedcontext.userName);
    if (res) {
      userDefinedcontext.alreadySaved = false;
      userDefinedcontext.backEndError = false;
    }
    else {
      userDefinedcontext.alreadySaved = true;
      userDefinedcontext.backEndError = true;
    }
  } catch (e) {
    userDefinedcontext.backEndError = true;
    userDefinedcontext.alreadySaved = false;
    console.log('backEndError');
  }
  userDefinedcontext.action = "";
  watsonSession.context = userDefinedcontext;
  return { sendBack: true };
}
const handleDelivery = async (userDefinedcontext, watsonSession, waResult) => {
  let order = userDefinedcontext._order_;
  let unitCode = userDefinedcontext._unitCode_;
  if (unitCode.length == 2) {
    unitCode = unitCode[0] + '0' + unitCode[1];
  }
  const data = await getIdandFirstNameByUnitCode(unitCode);
  if (data) {
    const residentId = data.residentId;
    const firstName = data.firstName;
    if (!order) order = 'A restaurant/courier';
    // save order
    let orderId = await saveOrder(order, residentId);
    console.log('Saved Order with ID: ' + orderId);
    sendNotification(residentId, firstName, order, orderId);
    userDefinedcontext.action = "";
    watsonSession.context = userDefinedcontext;
    // return { sendBack: true };
    return orderId;
  } else { 
    userDefinedcontext.action = "";
    waResult.output.generic[0].text = 'هذه الوحدة غير مسجلة، برجاء المحاولة مرة أخرى';
    watsonSession = new WatsonSession();
    watsonSession.username = 'Delivery';
    watsonSession.timestamp = new Date();
    watsonSession.sessionID = await createSession();
    watsonSession.context = { userName: 'Delivery', fromGoogleAPI: true };
    return null;
  }
}

// const fromArabicToEnglish=async(str)=>
// {
//   console.log(str)
//   await str.forEach(char => {console.log(char)})
//   // for(let i = 0;i<str.length;i++)
//   // {
//   //   console.log(i,str[i])
//   // }
// }

const formatCarPlate=async(carPlate)=>{
  function chars (string) {  
    return Array.from(
      String(string)
      )
    }
    let plateArray= chars(carPlate)
    let spaceBeforeIt=true
    let formatedCarPlate=''
    for (let i = 0; i < plateArray.length; i++) {
      if (i==0 && plateArray[i]==' ')
      {
      }
      else{
        if (spaceBeforeIt==true&&plateArray[i]!=' ')
        {
          formatedCarPlate=formatedCarPlate+plateArray[i]
          spaceBeforeIt=false
        }
        else if (spaceBeforeIt==false && plateArray[i]!=' ')
        {
          formatedCarPlate=formatedCarPlate+' '
          formatedCarPlate=formatedCarPlate+plateArray[i]
          spaceBeforeIt=false
        }
        else if (spaceBeforeIt==false && plateArray[i]==' '){
          formatedCarPlate=formatedCarPlate+' '
          spaceBeforeIt=true
        }
      } 
    }
    console.log(plateArray)
    console.log(chars(formatedCarPlate))
    if (formatedCarPlate[formatedCarPlate.length -1 ]==' '){formatedCarPlate=formatedCarPlate.substring(0,formatedCarPlate.length-1)}
    console.log(chars(formatedCarPlate)) 
    return formatedCarPlate
  }

  const isNumeric = (str) => {
    if (typeof str !== "string") return false
    return !isNaN(str) &&
      !isNaN(parseFloat(str))
  }

  const validateCarPlate =async (plateNumber)=>{

  } 
 
  const checkValidationOnPhoneNumber=async(phoneNumber)=>{
  if(phoneNumber.length==11 && isNumeric(phoneNumber)==true)
  {
      return true
    }
    else
    {
      return false
    }
  }
  const toEnglishNumber=async(strNum) =>{
    var ar = '٠١٢٣٤٥٦٧٨٩'.split('');
    var en = '0123456789'.split('');
    strNum = strNum.replace(/[٠١٢٣٤٥٦٧٨٩]/g, x => en[ar.indexOf(x)]);
    // strNum = strNum.replace(/[^\d]/g, '');
    return strNum;
 }
  // const convertFromArabicToEnglish=async(duration)=>{
  // console.log(typeof(duration))
  // console.log(typeof duration)
  // return duration
  // }
  
module.exports = {
  simpleWAResultHandler: simpleWAResultHandler,
};