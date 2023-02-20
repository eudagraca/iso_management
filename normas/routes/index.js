var express = require('express');
var router = express.Router();
const indexController = require("../controller/indexController");
const { isAuth } = require('../server/middlewares/authentication');

router.get('/home', [isAuth], indexController.index);

router.use(function (req, res, next) {
  res.locals.sessionID = req.session.sessionID;
  next();
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'EDM Portal de Conhecimento' });
});


module.exports = router;

