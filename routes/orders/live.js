var connection = require("../../config/db").connection;

exports.live = async function(req, res) {
  const { userId } = req.session;

  await connection.query("SELECT * FROM users where id=?", [userId], function(
    error,
    results,
    fields
  ) {
    connection.query(
      "SELECT * FROM cycles where booked_by = ?",
      [userId],
      function(error, results2, fields) {
        if (error) throw error;
        res.render("live.ejs", {
          user: results,
          data: results2
        });
      }
    );
  });
};
