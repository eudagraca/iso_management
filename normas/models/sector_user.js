"use strict";
const { Sequelize } = require("sequelize");
const database = require("../database/config/connection");
const Sector = require("./sector");
const User = require("./user");
const SectorsUsers = database.define(
  "sectors_users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    sectorId: { type: Sequelize.INTEGER, allowNull: false, field: "sector_id"},
    userId: { type: Sequelize.INTEGER, allowNull: false, field: "user_id"  },
    is_managed: { type: Sequelize.BOOLEAN },
    created: { type: Sequelize.DATE, },
    updated: { type: Sequelize.DATE,  },
    
  },
  {
    // sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: "sectors_users",
  }
);
// User.belongsToMany(Sector, { through: SectorsUsers });
// Sector.belongsToMany(User, { through: SectorsUsers });
Sector.belongsToMany(User, {
  through: SectorsUsers,
  as: "users",
  foreignKey: "sectorId",
});
User.belongsToMany(Sector, {
  through: SectorsUsers,
  as: "sectors",
  foreignKey: "userId",
});
module.exports = SectorsUsers;
