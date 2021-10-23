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
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    upload_url: DataTypes.STRING
  }, {
    sequelize,
    underscored: true,
    tableName: 'comment',
    modelName: 'Comment',
  });
  return Comment;
};