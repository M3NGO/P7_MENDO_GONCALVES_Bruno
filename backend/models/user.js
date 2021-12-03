'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({Post, Comment, Post_likes_dislikes, Comment_likes_dislikes}) {
      this.hasMany(Post, {foreignKey: 'uuid', as:'post', onDelete: 'cascade', hooks: true}) // on est dans le modele User donc on dit a sequelize qu'on va associer notre uuid
      this.hasMany(Comment, {foreignKey: 'uuid', as:'comment', onDelete: 'cascade', hooks: true})
      this.hasMany(Post_likes_dislikes, {foreignKey: 'uuid', as:'postlikes', onDelete: 'cascade', hooks: true})
      this.hasMany(Comment_likes_dislikes, {foreignKey: 'uuid', as:'commentlikes', onDelete: 'cascade', hooks: true})
      // define association here
    }
    //pour cacher des infos de base de donnée renvoyées via JSON au front : toJSON()
    toJSON() { 
      return { ...this.get(), id: undefined, password:undefined } //on cache l'id dans la table MYSQL et le hash password dans la réponse JSON
    }
  };
  User.init({
    active:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
      allowEmpty: false
    }, // UUID pour la création d'url perso sans divulguer le ranking de l'user dans la BDD
    firstname: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: 'Sacha',
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: true,
      // defaultValue: 'Groupomania',
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, //unique pour forcer la BDD a n'avoir qu'une fois un email
      validate:{
        notNull: { msg: "L'utilisateur doit avoir une adresse mail"},
        notEmpty: { msg: "L'utilisateur doit renseigner son adresse mail'"},
        isEmail: { msg: "L'utilisateur doit utiiliser un email valide"}
      }
    },
    password: {
      type: DataTypes.STRING.BINARY, // binary pour stocker les hash password
      allowNull: false,
      validate:{
        notNull: { msg: "L'utilisateur doit avoir un mot de passe"},
        notEmpty: { msg: "L'utilisateur doit renseigner son mot de passe"}
      }
    },
    upload_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    role: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
      allowNull: false
    },
  }, {
    sequelize,
    underscored: true, // pour dire a sequelize que les noms des colonnes MYSQL sont écrites avec unserscore
    tableName: 'user', //modifié après création
    modelName: 'User', // nom du modele utilisé dans app.js
  });
  return User;
};