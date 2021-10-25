'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id'})
      this.belongsTo(Post, {foreignKey: 'post_id'})
    }
  };
  Comment.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false
    },
    post_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false
    },
    content:{
      type: DataTypes.TEXT,
      allowNull: false,
  },
    upload_url: {
      type: DataTypes.STRING,
      allowNull: true,
      allowEmpty: true
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'comment',
    modelName: 'Comment',
  });
  return Comment;
};