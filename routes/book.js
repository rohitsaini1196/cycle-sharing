var connection = require("../config/db").connection;

exports.book = function(req, res) {
  var bookingData = req.body;
  console.log(bookingData);

  //console.log(email + passwordLogin);
};
