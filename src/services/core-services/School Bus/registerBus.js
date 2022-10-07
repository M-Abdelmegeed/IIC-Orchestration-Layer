const { registerSchoolBus } = require("../../database/databaseQuery");

const registerBusController= async (req,res)=>{
    const SchoolName =req.body.schoolName;
    let busPlates=req.body.busPlates.trim();
    const duration=req.body.duration;

    busPlates = formatCarPlate(busPlates);

    await registerSchoolBus(SchoolName,busPlates,duration);
    console.log(SchoolName +" "+ busPlates+" " +duration);
    // res.send(SchoolName +" "+ busPlates+" " +duration);
    res.redirect("https://iic-school-bus.netlify.app")
}

let formatCarPlate = (plate) => {
  plate = plate.trim();
  let formattedCarPlate = "";

  for (let i = 0; i < plate.length; i++) {
    if (plate[i] !== " " && i < plate.length - 1) {
      formattedCarPlate = formattedCarPlate + plate[i] + " ";
    }
  }

  return formattedCarPlate + plate[plate.length - 1];
};

module.exports=registerBusController;