'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment_likes_dislikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment, Post}) {
      this.belongsTo(User, {foreignKey: 'uuid', onDelete: 'cascade', hooks: true})
      this.belongsTo(Comment, {foreignKey: 'id', onDelete: 'cascade', hooks: true})
      this.belongsTo(Post, {foreignKey: 'post_id', as:'post', onDelete: 'cascade', hooks: true})

      // define association here
    }
  };
  Comment_likes_dislikes.init({
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
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
    post_id:{
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false
    },
    likes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
  }, {
    sequelize,
    tableName: 'comment_likes_dislikes',
    modelName: 'Comment_likes_dislikes',
  });
  return Comment_likes_dislikes;
};