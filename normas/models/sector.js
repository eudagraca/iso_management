"use strict";
const { Sequelize } = require("sequelize");
const database = require("../database/config/connection");
const Sector = database.define(
  "sectors",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: { type: Sequelize.STRING, allowNull: false },
    created: { type: Sequelize.DATE },
    updated: { type: Sequelize.DATE},
  },
  {
    // sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: "sectors",
  }
);
module.exports = Sector;
