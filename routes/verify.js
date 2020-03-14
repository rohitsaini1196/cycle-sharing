var connection = require("../config/db").connection;
const nodemailer = require("nodemailer");
const transporter = require("../config/mail").transporter;

exports.verify = function(req, res) {
  const userid = req.body.uid;
  console.log(userid);

  var mailOptions = {
    from: "cycoolindia@gmail.com",
    to: "rohits17@iiserb.ac.in",
    subject: "Sending Email using Node.js",
    html: "<h1>Welcome</h1><p>That was easy!</p>"
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      console.log(error);
    } else {
      res.send("mail send gg");
      console.log("Email sent: " + info.response);
    }
  });
};
