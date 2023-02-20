const dbConfig = require("./config");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  port: dbConfig.port,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

// console.log(sequelize)
sequelize.sync()


// const db_instance = {};
// db_instance.Sequelize = Sequelize;
// db_instance.sequelize = sequelize;
// db_instance.user = require("../../models/user.js")(sequelize, Sequelize);

module.exports = sequelize;