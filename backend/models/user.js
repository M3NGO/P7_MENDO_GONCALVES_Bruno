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
    static associate(models) {
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
    },
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
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'user', //modifié après création
    modelName: 'User', // nom du modele utilisé dans app.js
  });
  return User;
};