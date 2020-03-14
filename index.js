const express = require("express");
const bodyParser = require("body-parser");
const app = express();
var path = require("path");
var router = express.Router();
const multer = require("multer");
const session = require("express-session");
const avatarsMiddleware = require("adorable-avatars");

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
app.use(
  "/randomimagepasswordisalwayschangingyoucannotdeocdeit",
  avatarsMiddleware
);
app.use(
  session({
    name: "sid",
    resave: false,
    saveUninitialized: false,
    secret: "aurkyakarsaktehai!",
    cookie: {
      maxAge: 60 * 60 * 2 * 1000,
      sameSite: false,
      secure: false
    }
  })
);

//storage
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
const logout = require("./routes/logout");

//session function
const sessionRoute = require("./sessiongg");

//Order details per user
const orderRouter = require("./routes/orders/order");
const orderLive = require("./routes/orders/live");
const orderCycles = require("./routes/orders/cycles");
const orderPrevious = require("./routes/orders/previous");
const verify = require("./routes/verify");
const forget = require("./routes/forget");
const reset = require("./routes/reset");

app.use("/orders", orderRouter);

app.post("/addcycle", upload.single("myFile"), addCycle.addCycle);
app.post("/", login.login);
app.post("/register", register.register);
app.post("/book", book.book);
app.post("/logout", logout.logout);
app.post("/verify", verify.verify);
app.post("/forget", forget.forget);
app.post("/reset", reset.reset);

app.get("/users/:id", sessionRoute.redirectLogin, function(req, res) {
  const { userId } = req.session;
  // console.log("req param id :  " + req.params.id);
  // console.log("userID :     sdfg   " + userId);

  if (userId == req.params.id) {
    connection.query(
      "select * from users where Id=?",
      [req.params.id],
      function(error, results, fields) {
        if (error) throw error;
        //res.end(JSON.stringify(results));
        res.render("user.ejs", {
          id: results[0].id,
          name: results[0].name,
          email: results[0].user_email,
          address: results[0].address,
          contact: results[0].contact_no,
          verified: results[0].verified,
          joined: results[0].created
        });
        //  console.log(results[0]);

        // console.log(timerAgogg(results[0].created));
      }
    );
  } else {
    res.send("you do not have access for this");
  }
});

app.get("/reset/:token", function(req, res) {
  const tokenId = req.params.token;
  console.log(tokenId);

  connection.query(
    "select * from resetpassword where token =? AND expire >= NOW() AND used = 0",
    [tokenId],
    function(error, user, fields) {
      if (error) throw error;
      if (user.length > 0) {
        console.log(user[0].email);

        res.render("reset.ejs", {
          email: user[0].email
        });
      } else {
        res.send({
          code: 204,
          success:
            "this token is used already! Check your mail for new link for resetting password!!"
        });
      }
    }
  );
});
//front page
app.get("/", sessionRoute.redirectLogin, (req, res) => {
  const { userId } = req.session;

  connection.query("SELECT * FROM users where id=?", [userId], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    connection.query("SELECT * FROM cycles", function(error, results2, fields) {
      if (error) {
        res.send({
          code: 400,
          failed: "error ocurred"
        });
      } else {
        if (results.length > 0) {
          //res.send(results);
          res.render("index", { data: results2, user: results });
        } else {
          res.send({
            code: 404,
            success: "no cycle availible"
          });
        }
      }
    });
  });

  // res.send("Secured home page with username and all stuff");
});

app.get("/forget", (req, res) => {
  res.render("forget-pass.ejs");
});

app.get("/login", sessionRoute.redirectHome, (req, res) => {
  res.render("login.ejs");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.get("/register", sessionRoute.redirectHome, (req, res) => {
  res.render("register.ejs");
});

app.get("/addcycle", sessionRoute.redirectLogin, (req, res) => {
  const { userId } = req.session;

  connection.query("SELECT * FROM users where id=?", [userId], function(
    error,
    results,
    fields
  ) {
    if (error) throw error;
    if (results.length > 0) {
      res.render("add-cycle.ejs", { user: results });
    }
  });
});

// app.post("/verify", (req, res) => {
//   res.send("mail send to your account");
// });
var port = process.env.PORT || 80;
app.listen(port, () => {
  console.log("cycool at 3000");
});

//other functions
//TODO shift in this new file
