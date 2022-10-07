const nodemailer = require("nodemailer");
require("dotenv").config;
const jwt = require("jsonwebtoken");

const forgotPassword = (email, newPassword) => {
  try {
    // create a token containg the data to be sent in the mail
    const token = jwt.sign(
      { email, newPassword },
      process.env.ACCESS_TOKEN_SECRET
    );

    // create a transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "yasseremam2002@gmail.com",
        pass: process.env.EMAIL_PWD,
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // link that will be sent to the user in the mail to reset his password
    const resetLink = `${process.env.BASE_URL}:${process.env.PORT}/${token}`;

    let mailOptions = {
      from: "yasseremam2002@gmail.com",
      to: email,
      subject: "Request to reset your email password",
      text: `You have recieved a new mail to reset your IIC password\n\n If you requested to reset the password, click the following link: \n${resetLink} \n\nif you didn't request to reset the password, DON'T CLICK THE ABOVE LINK. \n\n\n Don't send any mails to this account as no one will respond`,
    };

    transporter.sendMail(mailOptions, (err, success) => {
      if (err) {
        console.error(err);
        return;
      } else if (success) {
        console.log("Email sent successfuly");
      }
    });

    return "email sent";
  } catch (error) {
    console.error(error);
    return;
  }
};

module.exports = forgotPassword;
