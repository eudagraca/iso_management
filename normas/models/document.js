"use strict";
const { Sequelize } = require("sequelize");
const sequelizePaginate = require('sequelize-paginate');
const getPagination =  require('sequelize-paginate');
const database = require("../database/config/connection");

const Document = database.define(
  "documents",
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: { type: Sequelize.STRING},  
    code: { type: Sequelize.STRING, allowNull: false },
    description: { type: Sequelize.TEXT, allowNull: false },
    published: { type: Sequelize.STRING },
    file_name: {type: Sequelize.STRING, allowNull: false },
    type: { type: Sequelize.STRING, allowNull: false  },
    sector_id: { type: Sequelize.INTEGER, allowNull: false},
    created_at: { type: Sequelize.DATE, },
    updated_at: { type: Sequelize.DATE,  },
  },
  {
    // sequelize,
    freezeTableName: true,
    timestamps: false,
    tableName: "documents",
    underscored: true
  }
  
);
const getPagingData = (data, page, limit) => {
  const { count: totalItems, rows: documents } = data;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  return { totalItems, documents, totalPages, currentPage };
};


//database.sync();
module.exports = Document;
