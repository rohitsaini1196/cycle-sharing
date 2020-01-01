const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
var router = express.Router();
const multer = require("multer");

//mysql connection check
var connection = require("./config/db.js").connection;
connection.connect(function(err) {
  if (!err) {
    console.log("Database is connected");
  } else {
    console.log("Error connecting database");
  }
});

//middlewares
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, "uploads");
  },
  filename: function(req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  }
});
var upload = multer({ storage: storage });

//routes
const addCycle = require("./routes/addCycle");
const login = require("./routes/login");
const register = require("./routes/register");
const book = require("./routes/book");

//app.use("/users", router);
app.post("/addcycle", upload.single("myFile"), addCycle.addCycle);
app.post("/dashboard", login.login);
app.post("/register", register.register);
app.post("/book", book.book);
//router.post("/:id", )
app.get("/users/:id", function(req, res) {
  connection.query("select * from users where Id=?", [req.params.id], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    res.end(JSON.stringify(results));
  });
});
//front page
app.get("/", (req, res) => {
  connection.query("SELECT * FROM cycles", function(error, results, fields) {
    if (error) {
      res.send({
        code: 400,
        failed: "error ocurred"
      });
    } else {
      if (results.length > 0) {
        //res.send(results);
        res.render("index", { data: results });
      } else {
        res.send({
          code: 404,
          success: "no cycle availible "
        });
      }
    }
  });
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
app.get("/addcycle", (req, res) => {
  res.render("add-cycle.ejs", {});
});

app.listen(3000, () => {
  console.log("cycool at 3000");
});
