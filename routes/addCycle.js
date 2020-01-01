var connection = require("../config/db").connection;
const cloudinary = require("cloudinary").v2;
const path = require("path");

cloudinary.config({
  cloud_name: "stillhungry",
  api_key: "YOUR_API_KEY",
  api_secret: "YOUR_API_SECRET"
});
exports.addCycle = function(req, res, next) {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  var today = new Date();

  console.log(file);

  var path2 = file.path;
  const uniqueFilename = new Date().toISOString();
  cloudinary.uploader.upload(
    path2,
    { public_id: `cycles/${uniqueFilename}`, tags: `cycles` }, // directory and tags are optional
    function(err, image) {
      if (err) return res.send(err);
      console.log("file uploaded to Cloudinary");
      // remove file from server
      const fs = require("fs");
      fs.unlinkSync(path2);
      // return image details
      console.log(image);

      // res.json(image);

      var cycleData = {
        cycle_name: req.body.cycle_name,
        from_user: req.body.from_user,
        pickup_address: req.body.pickup_address,
        from_time: req.body.from_time,
        to_time: req.body.to_time,
        cycle_image_link: image.url,
        from_user_name: req.body.from_user_name
      };

      //res.render("add-cycle.ejs", {});
      console.log(cycleData);

      if (cycleData.from_user != "" && cycleData.pickup_address != "") {
        connection.query("INSERT INTO cycles SET ?", cycleData, function(
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
              success: "CYcle registered sucessfully"
            });
          }
        });
      } else {
        res.send({
          code: 404,
          Error: "Name or password or email address not found"
        });
      }
    }
  );
};
