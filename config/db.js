var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "qwer5678",
  database: "cycool"
});

module.exports = {
  connection: connection
};
