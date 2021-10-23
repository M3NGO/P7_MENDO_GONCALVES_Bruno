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
    static associate({Post, Comment}) {
      this.hasMany(Post, {foreignKey: 'user_id'}) // on est dans le modele User donc on dit a sequelize qu'on va associer notre user_id
      this.hasMany(Comment, {foreignKey: 'user_id'})
      // define association here
    }
    //pour cacher des infos de base de donnée renvoyées via JSON au front : toJSON()
    toJSON() { 
      return { ...this.get(), id: undefined, password:undefined } //on cache l'id dans la table MYSQL et le hash password dans la réponse JSON
    }
  };
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    }, // UUID pour la création d'url perso sans divulguer le ranking de l'user dans la BDD
    firstname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true //unique pour forcer la BDD a n'avoir qu'une fois un email
    },
    password: {
      type: DataTypes.STRING.BINARY, // binary pour stocker les hash password
      allowNull: false
    },
    imageurl: {
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