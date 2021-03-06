'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('comment', {
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
        allowNull: false,
        allowEmpty: false
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        allowEmpty: false
      },
      avatar: {
        type: DataTypes.STRING,
        allowNull: true,
        allowEmpty: true
      },
      post_id: {
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
      nbre_likes:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      nbre_dislikes:{
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      created_at: {//ce champs doit etre renomé à la main pour mettre les underscore car underscore : true des models a été mis manuellement
        allowNull: false,
        type: DataTypes.DATE
      },
      updated_at: { //ce champs doit etre renomé à la main pour mettre les underscore car underscore : true des models a été mis manuellement
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('comment');
  }
};