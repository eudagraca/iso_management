var express = require("express");
var router = express.Router();
const { body, validationResult } = require("express-validator");
const userController = require("../controller/user/userController");
const authorization = require("../server/middlewares/authotization");
const { isAuth, isNotAuth } = require("../server/middlewares/authentication");
const Sector = require("../models/sector");

//Default for all routes
router.use(function (req, res, next) {
  res.locals.sessionID = req.session.sessionID;
  next();
});

router.post(
  "/signup",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Nome de usuário é obrigatório"),
    body("first_name")
      .not()
      .isEmpty()
      .withMessage("Primeiro nome é obrigatório"),
    body("first_name")
      .isLength({ min: 3 })
      .withMessage("Primeiro nome inválido"),

    body("username")
      .isLength({ min: 3 })
      .withMessage("Nome de usuário inválido"),
    body("last_name").not().isEmpty().withMessage("Ultimo nome é obrigatório"),
    body("last_name").isLength({ min: 3 }).withMessage("Último nome inválido"),

    body("role")
      .isIn(["basic", "supervisor", "admin", "root"])
      .withMessage("Responsabilidade de usuário inválida"),

    body("role")
      .not()
      .isEmpty()
      .withMessage("Responsabilidade não pode ser nula"),

    body("password", "Senha deve conter no mínino 4 caracteres")
      .isLength({ min: 4 })
      .custom((val, { req, loc, path }) => {
        if (val !== req.body.confirm_password) {
          throw new Error("As senhas não podem ser diferentes");
        } else {
          return true;
        }
      }),
      body("sector_id").custom(value => {

        return Sector.findOne({
          where: { id: value } 
        }).then(sector => {
            if (!sector) {
                // Custom error message and reject
                // the promise
                // throw new Error('this email is already in use '+ sector);
                return Promise.reject('O sector enviado não existe');
            }
        });
    })
  ],
  // [isNotAuth, authorization(["admin", "root"])],
  userController.signup
);

// All users
router.get(
  "/",
  // [isNotAuth, authorization(["admin", "root"])],
  userController.findAll
);

// Login user
router.get("/login", isAuth, userController.loginView);

// Call signUp user
router.get(
  "/signup",
  [isNotAuth, authorization(["admin", "root"])],
  userController.signUpView
);

router.post(
  "/login",
  [
    body("username")
      .not()
      .isEmpty()
      .withMessage("Nome de usuário precisa ser inserida"),
    body("password")
      .not()
      .isEmpty()
      .withMessage("A senha precisa ser inserida"),
  ],
  [isAuth],
  userController.login
);

router.get("/logout", isNotAuth, (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.redirect("/home");
    }
    res.redirect("/account/login");
  });
});

// Edit
router.get(
  "/edit/:id",
  [isNotAuth, authorization(["admin", "root"])],
  userController.editUserView
);


router.post(
  "/update/:id/:username",
  [
    body("first_name")
      .not()
      .isEmpty()
      .withMessage("Primeiro nome é obrigatório"),
    body("first_name")
      .isLength({ min: 3 })
      .withMessage("Primeiro nome inválido"),

    body("last_name").not().isEmpty().withMessage("Ultimo nome é obrigatório"),
    body("last_name").isLength({ min: 3 }).withMessage("Último nome inválido"),

    body("role")
      .isIn(["basic", "supervisor", "admin", "root"])
      .withMessage("Responsabilidade de usuário inválida"),

    body("role")
      .not()
      .isEmpty()
      .withMessage("Responsabilidade não pode ser nula")
  ],
  [isNotAuth, authorization(["admin", "root"])],
  userController.update
);

router.get(
  "/:username/username",
  [isNotAuth, authorization(["admin", "root"])],
  userController.getUserName
);

module.exports = router;
