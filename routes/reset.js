var connection = require("../config/db").connection;

//const transporter = require("../config/mail").transporter;
var passwordHash = require("password-hash");

exports.reset = function(req, res) {
  const mail = req.body.email;
  console.log(mail);

  const password = req.body.password;
  const password2 = req.body.password2;
  console.log(mail + "----" + password);

  if (password == password2) {
    var hashedPassword = passwordHash.generate(password);
    console.log(hashedPassword);

    connection.query(
      `UPDATE users SET password = ? WHERE user_email = ? `,
      [hashedPassword, mail],
      (error, result, fields) => {
        if (error) throw error;
        connection.query(
          `UPDATE resetpassword SET used = 1 WHERE email = ? `,
          [mail],
          (error, resultgg, fields) => {
            if (error) throw error;

            res.send(
              "Passoword Updated!, Please login from your Username and New Password"
            );
          }
        );
      }
    );
  } else {
    res.send("Password does not match");
  }
};
