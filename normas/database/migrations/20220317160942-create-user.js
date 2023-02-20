'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
       allowNull: false,
       autoIncrement: true,
       primaryKey: true,
       type: Sequelize.INTEGER
     },
     username: {
       type: Sequelize.STRING,
       length: 10,
       unique: true
     },
     first_name: {
       type: Sequelize.STRING,
       length: 20
     },
     last_name: {
       type: Sequelize.STRING,
       length: 20
     },
     password: Sequelize.STRING,
     lastLogin: {
       type: 'TIMESTAMP',
       field: 'last_login'
     },
     createdAt: {
       allowNull: false,
       type: 'TIMESTAMP',
       defaultValue: Sequelize.literal("NOW()"),
       field: 'created_at'

     },
     updatedAt: {
       allowNull: false,
       type: Sequelize.DATE,
       defaultValue: Sequelize.literal("NOW()"),
       onUpdate: Sequelize.literal("NOW()"),
       field: 'updated_at'
     },
     role: {
       type: Sequelize.STRING,
       default: 'basic',
       enum: ["basic", "supervisor", "admin", "root"]
      },
      accessToken: {
        type: Sequelize.STRING,
        field: 'access_token'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
