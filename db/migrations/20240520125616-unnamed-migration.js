'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('ToDo', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      isChecked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
      },
      text: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: { notNull: true, notEmpty: true },
      },
      updatedAt: {
        defaultValue: Date.now(),
        allowNull: false,
        type: Sequelize.DATE,
      },
      createdAt: {
        defaultValue: Date.now(),
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  down(queryInterface) {
    return queryInterface.dropTable('ToDo');
  },
};
