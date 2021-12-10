'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('post_likes_dislikes', {
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
      post_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        allowEmpty: false
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        allowEmpty: false
      },
      likes: {
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      dislikes: {
        type: DataTypes.INTEGER,
        defaultValue:0
      },
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('post_likes_dislikes');
  }
};