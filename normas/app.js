var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var flash = require("express-flash");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var documentsRouter = require("./routes/documents");
var sectorRouter = require("./routes/sector");
var methodOverride = require("method-override");
const { client, getAsync, redisStore } = require("./server/redis/config");
var app = express();
var cors = require("cors");

var allowedOrigins = ["*", "http://localhost:3000","http://127.0.0.1:3000", "http://localhost:3001", "http://localhost:3002", "http://localhost:3003", "http://localhost:3004"];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";

        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

app.set("views", [path.join(__dirname, "views")]);
app.set("view engine", "pug");
app.set("view options", { layout: true });

//Middleware
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(methodOverride());

app.use(flash());

//Configure session middleware
app.use(
  session({
    store: redisStore,
    secret: process.env.JWT_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      expires: new Date(Date.now() + 60 * 1000 * 30),
      secure: false, // if true only transmit cookie over https
      httpOnly: false, // if true prevent client side JS from reading the cookie
      // maxAge: new Date(Date.now() + (60 * 1000 * 30)) , // session max age in miliseconds
      // sameSite: 'lax', // make sure sameSite is not none
    },
  })
);

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        var msg =
          "The CORS policy for this site does not " +
          "allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  })
);

//Routes
app.use("/", indexRouter);
app.use("/account", usersRouter);
app.use("/documentos", documentsRouter);
app.use("/sectores", sectorRouter);

app.use(express.static(path.join(__dirname, "public")));
app.use("/account", express.static(__dirname + "/public"));
app.use("/documentos", express.static(__dirname + "/public"));
app.use("/documentos", express.static(__dirname + "/uploads"));
app.use("/documentos", express.static(__dirname + "/frontend"));
app.use("/sectores", express.static(__dirname + "/public"));
app.use("/uploads", express.static(__dirname + "/uploads"));

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
  return res.json({error: err.stack, message: err.message});
  // res.render("error");
});

module.exports = app;