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
      this.belongsTo(User, {foreignKey: 'uuid', as:'user', onDelete: 'cascade', hooks: true})
      this.belongsTo(Post, {foreignKey: 'post_id', as:'post', onDelete: 'cascade', hooks: true})
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