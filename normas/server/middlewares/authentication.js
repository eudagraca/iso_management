"use strict";
const { client } = require("../redis/config.js");

const isNotAuth = (req, res, next) => {
  console.log(req.params)
  if (!res.locals.sessionID) {
    return res.redirect("/account/login");
  }
  next();
};

const isAuth = (req, res, next) => {
  // res.json({data: req.session.sessionID});
  if (res.locals.sessionID) {
    res.redirect("/home");
  } else {
    next();
  }
};

module.exports = { isAuth, isNotAuth };
