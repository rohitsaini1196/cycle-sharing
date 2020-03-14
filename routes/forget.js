var connection = require("../config/db").connection;
//const nodemailer = require("nodemailer");
const transporter = require("../config/mail").transporter;
const crypto = require("crypto");

function addDay(days) {
  var result = new Date();
  result.setDate(result.getDate() + 1);
  return result;
}

exports.forget = function(req, res) {
  const mail = req.body.email;
  var today = new Date();
  // mail.trim();
  //console.log(mail);
  connection.query(
    `SELECT * FROM users WHERE user_email = ? `,
    [mail],
    (error, result, fields) => {
      if (error) throw error;

      if (result.length > 0) {
        resetData = {
          email: result[0].user_email,
          token: crypto.randomBytes(8).toString("hex"),
          expire: addDay(),
          createdAt: today,
          updated: today
        };
        // connection.query("INSERT INTO expiration ");
        connection.query("INSERT INTO resetpassword SET ?", resetData, function(
          error,
          results,
          fields
        ) {
          if (error) {
            console.log("error ocurred", error);
            res.send({
              code: 400,
              failed: "error ocurred"
            });
          } else {
            let link =
              "http://" + req.headers.host + "/reset/" + resetData.token;
            console.log(link);

            var mailOptions = {
              from: "cycoolindia@gmail.com",
              to: mail,
              subject: "Request of Updating password",
              html: `<h1>Cycool : Reset Your Password</h1><p> click this link to reset syour pasword</p>  <a href="${link}"> ${link} </a> <p>This link is valid for only 24 hours`
            };

            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                console.log(error);
              } else {
                console.log("Email sent: " + info.response);
                res.send(
                  "Please CHeck your Inbox (or SpamBox) and reset your password"
                );
              }
            });
          }
        });
      } else {
        res.send({
          code: 404,
          success: "No account from this mail exist"
        });
      }
    }
  );
};
