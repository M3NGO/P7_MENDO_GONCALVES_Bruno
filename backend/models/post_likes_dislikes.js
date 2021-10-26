'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post_likes_dislikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Post}) {
      this.belongsTo(User, {foreignKey: 'user_id', onDelete: 'cascade', hooks: true})
      this.belongsTo(Post, {foreignKey: 'post_id', onDelete: 'cascade', hooks: true})

      // define association here
    }
  };
  Post_likes_dislikes.init({
    post_id: {
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
      defaultValue: 0

    },
    dislikes: {
      type: DataTypes.INTEGER,
      defaultValue:0

    },
  }, {
    sequelize,
    tableName: 'post_likes_dislikes',
    modelName: 'Post_likes_dislikes',
  });
  return Post_likes_dislikes;
};