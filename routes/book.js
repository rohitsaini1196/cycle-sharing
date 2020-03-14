var connection = require("../config/db").connection;

exports.book = async function(req, res) {
  var bookingData = req.body;
  console.log(bookingData);

  await connection.query(
    "UPDATE cycles set booking_status =?, booked_by = ?, booking_time = ?  WHERE cycle_id = ?",
    [1, bookingData.consumerId, new Date(), bookingData.IdOfOrder],
    function(err, result) {
      console.log("Record Updated!!");
      console.log(result);
      res.send(result);
    }
  );
};
