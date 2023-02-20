'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sectors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
<<<<<<< HEAD
      created: {
=======
      createdAt: {
>>>>>>> 250dd2d4a3e2ba4ce546ee36ab72b678f17715e0
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal("NOW()"),
        field: 'created_at'
 
      },
<<<<<<< HEAD
      updated: {
=======
      updatedAt: {
>>>>>>> 250dd2d4a3e2ba4ce546ee36ab72b678f17715e0
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        onUpdate: Sequelize.literal("NOW()"),
        field: 'updated_at'
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Sectors');
  }
};