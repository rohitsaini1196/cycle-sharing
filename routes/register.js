var connection = require("../config/db").connection;
var passwordHash = require("password-hash");
exports.register = function(req, res) {
  var today = new Date();

  var passwordOrg = req.body.password;
  var hashedPassword = passwordHash.generate(passwordOrg);

  var user = {
    name: req.body.name,
    user_email: req.body.user_email,
    password: hashedPassword,
    address: req.body.address,
    contact_no: req.body.contact_no,
    created: today
  };

  if (user.name != "" && user.email != "" && user.password != "") {
    connection.query("INSERT INTO users SET ?", user, function(
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
        res.send({
          code: 200,
          success: "user registered sucessfully"
        });
      }
    });
  } else {
    res.send({
      code: 404,
      Error: "Name or password or email address not found"
    });
  }
};
