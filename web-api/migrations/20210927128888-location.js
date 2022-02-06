'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('locations', {
      problem_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        references: {
          model: 'problems',
          key: "problem_id",
        },
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      project: {
        type: DataTypes.STRING(100),
        allowNull: false
      },
      address_no: {
        type: DataTypes.STRING(10),
        allowNull: false
      },
      repair_type: {
        type: DataTypes.STRING(50),
        allowNull: true
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'locations' })
  }
};
