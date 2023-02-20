const { Op } = require("sequelize");
const User = require("../../models/user");
const sequelize = require("../database/config/connection");
const Document = require("../models/document");
const Sector = require("../models/sector");
const SectorsUsers = require("../models/sector_user");
const { client } = require("../server/redis/config");

exports.index = async (req, res, next) => {
  if (req.session.sessionID) {
    const user = await User.findOne({
      where: { id: req.session.sessionID.id },
    });
    const user_sector = await SectorsUsers.findOne({
      where: { user_id: user.id },
    });

    var sector = new Sector();

    if (user_sector) {
      sector = await Sector.findOne({ where: { id: user_sector.sectorId } });
    }

    var session = req.session;
    session.sessionID = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: user.accessToken,
      role: user.role,
      sector: user_sector,
      sectorName: sector.name,
    };
    // return res.json({access: sector})


    const loggedInUser = session.sessionID;
    res.locals.sessionID = session.sessionID;

    let users = await User.count();
    let sectors = await Sector.count();
    let documents = await Document.count();

    var date = new Date();
    date.setDate(date.getDate() - 8);

    const access = await User.findAll({
      where: {
        last_login: {
          [Op.gt]: date.toDateString(),
        },
      },
      attributes: [
        [sequelize.fn("COUNT", sequelize.col("*")), "count_access"],
      ],
      order: [["last_login", "ASC"]],
    });

    return res.render("content", {
      user: loggedInUser,
      title: "Visão Geral",
      users: users,
      sectors: sectors,
      documents: documents,
      access: access
    });
  }

  return res.redirect("/account/login");
};
