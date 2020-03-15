const nodemailer = require("nodemailer");
const { welcome } = require("./welcome_template");
const { resetPassword } = require("./resetpassword_template");

const getEmailData = (to, name, token, type, actionData) => {
  let data = null;

  switch (type) {
    case "welcome":
      data = {
        from: "Wave <test.app.personal@gmail.com>",
        to,
        subject: `Welcome to Wave ${name}`,
        html: welcome()
      };
      break;
    case "reset_password":
      data = {
        from: "Wave <test.app.personal@gmail.com>",
        to,
        subject: `Hello ${name}, reset your password`,
        html: resetPassword(actionData)
      };
      break;
    default:
      data;
  }

  return data;
};

const sendEmail = (to, name, token, type, actionData) => {
  const smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "test.app.personal@gmail.com",
      pass: process.env.MAIL_PASSWORD
    }
  });

  const mail = getEmailData(to, name, token, type, actionData);

  smtpTransport.sendMail(mail, function(err, res) {
    if (err) {
      console.log(err);
    } else {
      console.log("sent");
    }
    smtpTransport.close();
  });
};

module.exports = { sendEmail };
