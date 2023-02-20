require("dotenv").config();

const User = require("../../models/user");
const Sector = require("../../models/sector");
const SectorsUsers = require("../../models/sector_user");
const { validationResult } = require("express-validator");

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const sectors = await Sector.findAll({
    attributes: ["id", "name", "created", "updated"],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "first_name", "last_name"],
        through: {
          where: { is_managed: 1 },
          order: [["created", "DESC"]],
          limit: 1,
        },
      },
    ],
  });
  return res.json(sectors);

  return res.render("sector/index", {
    sectors: sectors,
    title: "Sectores",
  });
};

exports.create = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.mapped(),
        values: req.body,
        title: "Registo de sector",
      });
    }

    const { name, user_id } = req.body;

    const sector = await new Sector({
      name: name,
    }).save();

    await new SectorsUsers({
      sectorId: sector.id,
      userId: user_id,
      is_managed: 1,
    }).save();

    const user = await User.findOne({ where: { id: user_id } });
    user.role = "supervisor";
    user.save();

    return res.json({
      sector: req.body,
      title: "Novo sector adicionado",
    });
  } catch (error) {
    next(error);
  }
};

// Views
exports.creatView = (req, res) => {
  res.render("sector/create", { title: "Registo de Sector" });
};

exports.editSectorView = async (req, res) => {
  const sector = await Sector.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "created", "updated"],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "first_name", "last_name"],
        through: {
          where: { is_managed: 1 },
          order: [["created", "DESC"]],
          limit: 1,
        },
      },
    ],
  });

  if (!sector) {
    return res.json({ status: 404, message: "Sector não encontrado" });
    // res.status(404).render("error.pug", {
    //   error: {
    //     status: 404,
    //     stack: "Sector não encontrado",
    //     url: req.headers.referer,
    //   },
    //   message: "Sector não encontrado",
    // });
  } else {
    return res.json({ status: 200, sector: sector });
  }
  // res.render("sector/edit", { title: "Detalhes do sector", sector: sector });
};

//Update Sector

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("sector/edit", {
        errors: errors.mapped(),
        values: req.body,
        title: "Detalhes do sector",
      });
    }

    const { name, user_id } = req.body;

    const sector = await Sector.findOne({ where: { id: req.params.id } });
    sector.name = name;
    sector.save();

    const sectorUser = await SectorsUsers.findOne({
      where: { sectorId: req.params.id, is_managed: true },
    });
    //Create a new

    if (sectorUser) {
      const odlUser = await User.findOne({ where: { id: sectorUser.userId } });
      if (sectorUser.userId != user_id) {
        await new SectorsUsers({
          sectorId: sector.id,
          userId: user_id,
          is_managed: 1,
        }).save();

        odlUser.role = "basic";
        odlUser.save();

        const newUser = await User.findOne({
          where: { id: sectorUser.userId },
        });

        sectorUser.is_managed = 0;
        sectorUser.save();
        newUser.role = "basic";
        newUser.save();
        req.flash("info", "Sector actualizado com alteração do supervisor");
        res.redirect("/sectores");
      }
    } else {
      req.flash("info", "Sector actualizado");
      res.redirect("/sectores");
    }
  } catch (error) {
    next(error);
  }
};

exports.showSectorView = async (req, res) => {
  const sectores = await Sector.findOne({
    where: { id: req.params.id },
    attributes: ["id", "name", "created", "updated"],
    include: [
      {
        model: User,
        as: "users",
        attributes: ["id", "first_name", "last_name"],
        through: {
          where: { is_managed: 1 },
          order: [["created", "DESC"]],
        },
      },
    ],
  });

  // return res.json(sectores)

  if (!sectores) {
    res.status(404).render("error.pug", {
      error: {
        status: 404,
        stack: "Sector não encontrado",
        url: req.headers.referer,
      },
      message: "Sector não encontrado",
    });
  }
  res.render("sector/show", { title: "Detalhes do sector", sector: sectores });
};
