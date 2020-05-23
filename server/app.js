var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cors = require("cors");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const bodyParser = require('body-parser')
const jwt = require('express-jwt')
const jsonwebtoken = require('jsonwebtoken')

var indexRouter = require("./routes/index");
var userRouter = require("./routes/user");
var partRouter = require("./routes/part")
var partyRouter = require("./routes/party")

var app = express();
var db = require("./database/Database.js");

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(cors());
//app.use(express.json());
//app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json({limit: '10mb', extended: true}))
app.use(bodyParser.urlencoded({limit: '10mb', extended: true}))

//JWT middleware
// app.use(
//   jwt({
//     secret: 'dummy'
//   }).unless({
//     path: ['/user/login2']
//   })
// )

app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/part", partRouter);
app.use("/party", partyRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
exports.jsonwebtoken = jsonwebtoken;
