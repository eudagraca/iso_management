var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const sectorController = require("../controller/sector/sectorController");
const authorization = require("../server/middlewares/authotization");
const {isAuth, isNotAuth} = require("../server/middlewares/authentication");
//Default for all routes
router.use(function(req, res, next){
  res.locals.sessionID = req.session.sessionID;
  next();
});

router.post(
  "/",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Nome de sector é obrigatório"),

    body("user_id")
      .not()
      .isEmpty()
      .withMessage("Responsavel do sector em falta"),
  ],
  // [isNotAuth, authorization(['admin', 'root']),],
  sectorController.create
);

// All users
router.get(
  "/",
  // [isNotAuth],
  //  authorization(['admin', 'root']),
  sectorController.findAll
);

// Create
router.get("/create", 
[isNotAuth, authorization(['admin', 'root']),], 
sectorController.creatView);

// Edit
router.get(
  "/edit/:id",
  // [isNotAuth, authorization(["admin", "root"])],
  sectorController.editSectorView
);

router.post(
  "/update/:id",
  [
    body("name")
      .not()
      .isEmpty()
      .withMessage("Nome de sector é obrigatório"),

    body("user_id")
      .not()
      .isEmpty()
      .withMessage("Responsavel do sector em falta"),
  ],
  [isNotAuth, authorization(['admin', 'root']),],
  sectorController.update
);

// Show
router.get(
  "/show/:id",
  [isNotAuth, authorization(["admin", "root"])],
  sectorController.showSectorView
);

// module.exports = sequelize_instance;
module.exports = router;
