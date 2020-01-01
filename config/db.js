var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "YOUR_PASSWORD",
  database: "cycool OR_YOUR_DB_NAME"
});

module.exports = {
  connection: connection
};
