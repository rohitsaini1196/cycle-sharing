var connection = require("../../config/db").connection;

exports.live = function(req, res) {
  res.send("live orders goes here");
};
