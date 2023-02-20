var express = require("express");
var router = express.Router();
const { body } = require("express-validator");
const documentController = require("../controller/document/documentController");
const multer = require("multer"),
  path = require("path");
const { isNotAuth } = require("../server/middlewares/authentication");
const authorization = require("../server/middlewares/authotization");

//Default for all routes
// router.use(function (req, res, next) {
//   res.locals.sessionID = req.session.sessionID;
//   next();
// });

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/normas");
  },
  filename: function (req, file, cb) {
    const code = req.body.code.replace(/\s/g, "_");
    const {name} = req.body
    // const originalName = file.originalname.replace(/\s/g, "_");
    const ext = path.extname(file.originalname);
    const finalName = `${name}_${code}${ext}`;
    cb(null, finalName);
  }
});

const upload = multer({ storage: storage })

// Save documents
router.post(
  "/",
  [
    body("name").not().isEmpty().withMessage("Nome da norma é obrigatório"),
    body("code").not().isEmpty().withMessage("O codigo da norma é obrigatório"),

    body("published")
      .isLength({ min: 3 })
      .withMessage("A data de publicacao é obrigatório"),

    body("description")
      .not()
      .isEmpty()
      .withMessage("A descrição não pode ser nula"),
  ],
  // [isNotAuth, authorization(["admin", "root", "supervisor"])],
  upload.single("file_name"),
  documentController.save
);

// Display PDF
router.get("/:code/display", documentController.viewPDF);


router.get("/:code/privatePdf", 
// [isNotAuth], 
documentController.callPDF);


// All documents
router.get("/", 
// [isNotAuth], 
documentController.findAll);

//Return the view for creation
router.get("/create", [isNotAuth], documentController.registerView)

//Update router view
router.get("/edit/:id", [isNotAuth], documentController.updateView)

//Update router
router.post("/:id", upload.single("file_name"), [isNotAuth], documentController.update)




module.exports = router;
