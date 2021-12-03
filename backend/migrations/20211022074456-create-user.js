'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        allowEmpty: false
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: 'Sacha',
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: true,
        // defaultValue: 'Groupomania',
      },
      poste: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: DataTypes.STRING.BINARY,
        allowNull: false
      },
      upload_url: {
        type: DataTypes.STRING,
        allowNull: true
      },
      role: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
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
    await queryInterface.dropTable('user');
  }
};