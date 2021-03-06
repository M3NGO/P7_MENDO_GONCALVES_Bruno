'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    const moment= require('moment') 
    await queryInterface.createTable('user', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
        allowNull: false,
        allowEmpty: false
      },
      active:{
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      user_deleted:{
        type: DataTypes.BOOLEAN,
        defaultValue: false
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
      nbre_posts:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      nbre_comments:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      created_at: {//ce champs doit etre renomé à la main pour mettre les underscore car underscore : true des models a été mis manuellement
        allowNull: false,
        type: DataTypes.DATE,
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