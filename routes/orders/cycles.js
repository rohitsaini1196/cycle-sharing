var connection = require("../../config/db").connection;

exports.cycles = async function(req, res) {
  const { userId } = req.session;

  await connection.query("SELECT * FROM users where id=?", [userId], function(
    error,
    results,
    fields
  ) {
    connection.query(
      "SELECT * FROM cycles where from_user = ?",
      [results[0].user_email],
      function(error, results2, fields) {
        if (error) throw error;
        res.render("your-cycles.ejs", {
          user: results,
          data: results2
        });
      }
    );
  });
};
