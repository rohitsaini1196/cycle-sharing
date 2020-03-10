var connection = require("../config/db").connection;

exports.book = function(req, res) {
  var bookingData = req.body;
  console.log(bookingData);
  //res.send("Please Confirm your booking!!!!!!!!");

  //console.log(email + passwordLogin);
};
