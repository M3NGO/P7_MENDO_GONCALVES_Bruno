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
    static associate({User, Comment, Post_likes_dislikes}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'user_id', onDelete: 'cascade', hooks: true}) // puisqu'on est dans modele post, alors on y associe le model User et on lui dit que post appartient a User sur la foreing key user_id
      this.hasMany(Comment, {foreignKey: 'post_id', as:'comment', onDelete: 'cascade', hooks: true}) // as:'comment' pour donner l'alias comment qu'on va mettre dnas controller Post pour livrer tous les posts et leurs commentaires respectifs sur le mur
      this.hasMany(Post_likes_dislikes, {foreignKey: 'post_id', onDelete: 'cascade', hooks: true})

    }
    toJSON() { 
      return { ...this.get(), id: undefined, user_id:undefined } //on cache l'id dans la table MYSQL et l'id du user dans la réponse JSON
    }
  };
  Post.init({
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      allowEmpty: false
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
  }, {
    sequelize,
    underscored: true,
    tableName: 'post',
    modelName: 'Post',
  });
  return Post;
};
// commande pour créer ce model sequelize model:generate --name Post --attributes user_id:integer,content:string,upload_url:string 