'use strict';
module.exports = {
  up: async (queryInterface, DataTypes) => {
    await queryInterface.createTable('comment_likes_dislikes', {
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
    await queryInterface.dropTable('comment_likes_dislikes');
  }
};