'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User, Comment, Post_likes_dislikes, Comment_likes_dislikes}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'uuid', as:'user', onDelete: 'cascade', hooks: true}) // puisqu'on est dans modele post, alors on y associe le model User et on lui dit que post appartient a User sur la foreing key uuid
      this.hasMany(Comment, {foreignKey: 'post_id', as:'comment', onDelete: 'cascade', hooks: true}) // as:'comment' pour donner l'alias comment qu'on va mettre dnas controller Post pour livrer tous les posts et leurs commentaires respectifs sur le mur
      this.hasMany(Post_likes_dislikes, {foreignKey: 'post_id',as:'postlikes', onDelete: 'cascade', hooks: true})
      this.hasMany(Comment_likes_dislikes, {foreignKey: 'post_id',as:'commentlikes', onDelete: 'cascade', hooks: true})

    }
    // toJSON() { 
    //   return { ...this.get(), id: undefined,} //on cache l'id dans la table MYSQL et l'id du user dans la réponse JSON
    // }
  };
  Post.init({
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
  }, {
    sequelize,
    underscored: true,
    tableName: 'post',
    modelName: 'Post',
  });
  return Post;
};
// commande pour créer ce model sequelize model:generate --name Post --attributes uuid:integer,content:string,upload_url:string