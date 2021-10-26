'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('Comment_likes_dislikes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      comment_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        allowEmpty: false
      },
      user_id: {
        type: DataTypes.INTEGER,
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
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  down: async (queryInterface, DataTypes) => {
    await queryInterface.dropTable('Comment_likes_dislikes');
  }
};