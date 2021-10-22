// let mongoose = require('mysql');
let bcrypt = require("bcrypt");

// let userSchema = mongoose.Schema({
//     email : {type : String, required:true, unique:true}, // unique:true  + validateur mongoose pour empecher des users de créer deux profils avec une meme boite mail
//     password : {type : String, required:true},

// });


// // ne pas oublier de mettre 'npm install --save mongoose-unique-validator' dans le terminal
// module.exports = mongoose.model('User',userSchema);
let mysqlDatabase = require('../mysql/mysqlDatabase')
let { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize(mysqlDatabase.DB, mysqlDatabase.USER, mysqlDatabase.PASSWORD, {
  host: mysqlDatabase.HOST,
  dialect: mysqlDatabase.dialect
});

let user = sequelize.define('user', {
  // Model attributes are defined here
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoincrement: true,
},
  firstname: {
    type: DataTypes.STRING(100),
    allowNull: false
},
  lastname: {
    type: DataTypes.STRING(100),
    allowNull: false
},
  email: {
    type : DataTypes.STRING,
    allowNull: false,
    unique: true
},
    password: {
    type : DataTypes.STRING,
    allowNull: false,}
}, {
    tableName: 'user',
    instanceMethods: {
        generateHash(password) {
            return bcrypt.hash(password, bcrypt.genSaltSync(10));
        },
        validPassword(password) {
            return bcrypt.compare(password, this.password);
        }
    }
});


//tests connexion
async function util(){
    await user.sync();
}
util()
async function run(){
    try {
       await sequelize.authenticate();
      console.log('Connection has been established successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
    }
    run();
// FIN - tests connexion


// `sequelize.define` also returns the model
console.log(user === sequelize.models.user); // true