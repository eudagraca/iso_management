"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sectors_users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      sector_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "sectors",
          key: "id",
        },
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      is_managed: {
        type: Sequelize.BOOLEAN,
        default: false,
      },

      created: {
        allowNull: false,
        type: "TIMESTAMP",
        defaultValue: Sequelize.literal("NOW()")
      },
      updated: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        onUpdate: Sequelize.literal("NOW()"),
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("sectors_users");
  },
};
