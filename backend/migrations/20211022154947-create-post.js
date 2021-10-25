'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('post', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      user_id: {
        type: DataTypes.INTEGER
      },
      content: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      upload_url: {
        type: DataTypes.STRING,
        allowNull: true,
        allowEmpty: true
      },
      created_at: {//ce champs doit etre renomé à la main pour mettre les underscore car underscore : true des models a été mis manuellement
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: {//ce champs doit etre renomé à la main pour mettre les underscore car underscore : true des models a été mis manuellement
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('post');
  }
};
// pour appeller cette migration : sequelize db:migrate