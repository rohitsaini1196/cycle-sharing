var connection = require("../config/db").connection;

var passwordHash = require("password-hash");

exports.login = function(req, res) {
  var email = req.body.email;
  var passwordLogin = req.body.password;
  //console.log(email + passwordLogin);

  connection.query("SELECT * FROM cycles", function(error, data, fields) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      if (data.length > 0) {
        connection.query(
          "SELECT * FROM users WHERE user_email = ?",
          [email],
          function(error, results, fields) {
            if (error) {
              res.send({
                code: 400,
                failed: "error ocurred"
              });
            } else {
              if (results.length > 0) {
                if (passwordHash.verify(passwordLogin, results[0].password)) {
                  const { userId } = req.session;

                  req.session.userId = results[0].id;
                  // res.render("profile.ejs", {
                  //   data: data,
                  //   name: results[0].name,
                  //   email: results[0].user_email,
                  //   address: results[0].address,
                  //   contact: results[0].contact_no,
                  //   id: results[0].id
                  // });
                  res.redirect("/");
                  // console.log(data);
                } else {
                  res.send({
                    code: 204,
                    success: "Email and password does not match"
                  });
                }
              } else {
                res.send({
                  code: 204,
                  success: "Email does not exits"
                });
              }
            }
          }
        );
      } else {
        res.send({
          code: 404,
          success: "Koy cycle hi availible nhi hai bhai gg startup"
        });
      }
    }
  });
};
