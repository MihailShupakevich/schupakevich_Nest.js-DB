'use strict';
module.exports = {
  up(queryInterface, Sequelize) {
    queryInterface.createTable('ToDos', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      isChecked: {
        defaultValue: false,
        type: Sequelize.BOOLEAN,
        allowNull: false,
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
    return queryInterface.dropTable('ToDos');
  },
};
