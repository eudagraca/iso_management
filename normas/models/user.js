"use strict";
const { Sequelize } = require("sequelize");
const database = require("../database/config/connection");
const User = database.define(
  "users",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    username: { type: Sequelize.STRING, allowNull: false },
    first_name: { type: Sequelize.STRING, allowNull: false },
    last_name: { type: Sequelize.STRING, allowNull: false },
    password: { type: Sequelize.STRING, allowNull: false },
    last_login: { type: Sequelize.DATE },
    role: {
      type: Sequelize.ENUM('basic', 'supervisor', 'admin', 'root'),
      allowNull: false,
      required: true
    },
    created_at: { type: Sequelize.DATE },
    updated_at: { type: Sequelize.DATE },
    accessToken: {
      type: Sequelize.STRING, field: "access_token" 
    }
  },
  {
    // sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: "users",
  }
);
module.exports = User;
