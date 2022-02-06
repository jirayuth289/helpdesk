'use strict';

module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('customers', {
      customer_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      customer_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      mobile_number: {
        type: DataTypes.STRING(10),
        allowNull: true,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false
      },
      version: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0,
      }
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable({ tableName: 'customers' })
  }
};
