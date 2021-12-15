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
    static associate({User, Post, Comment_likes_dislikes}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'uuid', as:'user', onDelete: 'cascade', hooks: true})
      this.belongsTo(Post, {foreignKey: 'post_id', as:'post', onDelete: 'cascade', hooks: true})
      this.hasMany(Comment_likes_dislikes, {foreignKey: 'comment_id',as:'commentlikes', onDelete: 'cascade', hooks: true})
    }
    // toJSON() { 
    //   return { ...this.get(), id: undefined,} //on cache l'id dans la table MYSQL et l'id du user dans la réponse JSON
    // }
  };
  Comment.init({
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
    nbre_likes:{
      type: DataTypes.INTEGER,
      defaultValue:0
    },
    nbre_dislikes:{
      type: DataTypes.INTEGER,
      defaultValue:0
    },
  }, {
    sequelize,
    underscored: true,
    tableName: 'comment',
    modelName: 'Comment',
  });
  return Comment;
};