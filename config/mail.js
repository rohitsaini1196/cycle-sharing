const nodemailer = require("nodemailer");

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "stillhungryindia@gmail.com",
    pass: "_________________"
  }
});

module.exports = {
  transporter: transporter
};
