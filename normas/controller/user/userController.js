require("dotenv").config();

const User = require("../../models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const sequelize = require("../../database/config/connection");

const { validationResult } = require("express-validator");
const { Op } = require("sequelize");
const SectorsUsers = require("../../models/sector_user");
const Document = require("../../models/document");
const Sector = require("../../models/sector");

async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

async function validatePassword(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}

// Retrieve all Tutorials from the database.
exports.findAll = async (req, res) => {
  const users = await User.findAll({
    attributes: [
      "id",
      "role",
      "last_login",
      "username",
      "first_name",
      "last_name",
      "created_at",
      "updated_at",
    ],
  });

  if (req.query.resp == "json") {
    const search = req.query.search;
    const results = [];

    try {
      const users = await User.findAll({
        where: {
          [Op.or]: {
            first_name: {
              [Op.like]: "%" + search + "%",
            },
            last_name: {
              [Op.like]: "%" + search + "%",
            },
          },
        },
      });
      users.forEach((user) => {
        let { id, first_name, last_name } = user;
        results.push({ value: id, label: first_name + " " + last_name });
      });
    } catch (err) {
      // console.log(err);
    }
    return res.json(results);
  }
  return res.json(users);
};

exports.delete = (req, res) => {
  const id = req.params.id;
  User.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.json({
          message: "Document was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Document with id=${id}. Maybe Tutorial was not found!`,
        });
      }
    })
    .catch(() => {
      res.status(500).send({
        message: "Could not delete Document with id=" + id,
      });
    });
};

exports.signup = async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      const sectors = await Sector.findAll({
        attributes: ["id", "name"],
        order: [["name", "ASC"]],
      });

      return res.json({
        errors: errors.mapped(),
        values: req.body,
        title: "Registo de usuário",
      });
    }

    const { password, role, username, first_name, last_name, sector_id } =
      req.body;

    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      password: hashedPassword,
      role: role || "basic",
      username,
      first_name,
      last_name,
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();

    await new SectorsUsers({
      sectorId: sector_id,
      userId: newUser.id,
      is_managed: 0,
    }).save();

    return res.json({
      user: newUser,
    });
  } catch (error) {
    return res.json({
      error: error,
    });
  }
};

//Login
exports.login = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        correctCredentials: "Senha ou usuário incorrecto",
        error: errors.array(),
        type: "danger",
      });
    }
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });

    // Senha incorrecta
    if (!user)
      return res.json({
        correctCredentials: "Senha ou usuário incorrecto",
        error: errors.array(),
        type: "danger",
      });

    const validPassword = await validatePassword(password, user.password);

    // Senha incorrecta
    if (!validPassword)
      return res.json({
        correctCredentials: "Senha ou usuário incorrecto",
        error: errors.array(),
        type: "danger",
      });

    // Create token
    const accessToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    user.accessToken = accessToken;
    user.last_login = new Date().toLocaleString();
    await user.save();

    const user_sector = await SectorsUsers.findOne({
      where: { user_id: user.id },
    });
    const sector = await Sector.findOne({
      where: { id: user_sector ? user_sector.sectorId : 0 },
    });

    var session = req.session;
    session.sessionID = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: accessToken,
      role: user.role,
      sector: sector,
    };

    const compactUser = {
      id: user.id,
      username: user.username,
      first_name: user.first_name,
      last_name: user.last_name,
      access_token: user.accessToken,
      role: user.role,
      sector: sector,
      sector_name: sector ? sector.name : null,
    };

    //Geting totals
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
      attributes: [[sequelize.fn("COUNT", sequelize.col("*")), "count_access"]],
      order: [["last_login", "ASC"]],
    });

    // session.sessionID = user;
    res.locals.sessionID = session.sessionID;
    return res.json({
      user: compactUser,
      login: true,
      users: users,
      sector: sector ? sector.name : null,
      sectors: sectors,
      documents: documents,
      access: access,
      accessToken: accessToken,
      type: "success",
      correctCredentials: "Seja bem vindo",
    });
  } catch (error) {
    return res.json({ error: error });
  }
};

// Views
exports.loginView = (req, res) => {
  if (res.locals.currentUser) {
    res.redirect("/home");
  } else {
    res.render("users/login", { title: "LogIn" });
  }
};

exports.signUpView = async (req, res) => {
  const sectors = await Sector.findAll({
    attributes: ["id", "name"],
    order: [["name", "ASC"]],
  });

  res.render("users/signup", { title: "Registo de usuário", sectors: sectors });
};

exports.editUserView = async (req, res) => {
  const user = await User.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: Sector,
        as: "sectors",
        attributes: ["id", "name"],

        through: {
          // where: { is_managed: 0 },

          attributes: ["id", "sectorId", "userId", "is_managed", "updated"],
          order: [["id", "DESC"]],
          limit: 1,
        },
        order: [
          [Sector, "updated", "ASC"],

          ["id", "DESC"],
        ],
      },
    ],
  });

  const sectors = await Sector.findAll({
    order: [["name", "ASC"]],
    attributes: ["id", "name"],
  });

  if (!user) {
    return res.json({
      error: {
        status: 404,
        stack: "Usuário não encontrado",
        url: req.headers.referer,
      },
      message: "Usuário não encontrado",
    });
  }

  return res.json({
    title: "Detalhes do usuario",
    user: user,
    sectors: sectors,
  });
};

exports.update = async (req, res, next) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.json({
        errors: errors.mapped(),
        values: req.body,
        title: "Registo de usuário",
      });
    }
    const { password, role, username, first_name, last_name } = req.body;
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      password: hashedPassword,
      role: role || "basic",
      username,
      first_name,
      last_name,
    });
    const accessToken = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    newUser.accessToken = accessToken;
    await newUser.save();

    return res.json({
      user: newUser,
      title: "Novo usuário adicionado com sucesso",
    });
  } catch (error) {
    return res.json({ error: error });
  }
};

exports.getUserName = async function (req, res) {
  let usernameGen = await User.findOne({
    where: { username: req.params.username },
  });
  let newUserName = "";
  if (usernameGen) {
    newUserName = usernameGen.username + "_0" + Math.floor(Math.random() * 100);
  } else {
    newUserName = req.params.username;
  }
  return res.json({ username: newUserName });
};
