'use strict';

module.exports = {
  
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING,
        length: 50,
        unique: true
      },
      code: {
        type: Sequelize.STRING,
        length: 20,
        unique: true
      },
      description: {
        type: Sequelize.TEXT,
        length: 500,
        allowNull: false
      },
      published: Sequelize.STRING,
      
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
     });
   },
   async down(queryInterface, Sequelize) {
     await queryInterface.dropTable('documents');
   }
 };
