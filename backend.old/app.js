let express = require('express'); //librairie de Javascript
let app = express();
let bodyParser = require('body-parser') // import de body-parser après l'avoir installé dans package.json on s'en sert ensuite dans app.post
// bodyparser sert rendre le body de la requete exploitable par l'app

let path = require('path');
//importer le routeur du dossier router backend:
// let saucesRoutes = require('./routes/sauces')
let userRoutes = require('./routes/user')

// A voir let mongoMask = require('mongo-mask') a implementer pour securiser l'application

// // Connection a MYSQL
// let mysql = require('mysql2');
let mysqlConfig = require("./mysql/mysqlDatabase");

// let mysqlDatabase = mysql.createConnection({
//   host: mysqlConfig.HOST,
//   user: mysqlConfig.USER,
//   password: mysqlConfig.PASSWORD,
//   database: mysqlConfig.DB
// });

// // fonction connect mour se connecter a mysql
// let connexionBdd = mysqlDatabase.connect(function(err) {
//   if (err) throw err;
//   console.log("Connecté à la base de données MySQL - coco!");

// });
// // FIN - Connection a MYSQL

const { Sequelize } = require('sequelize');
const sequelize = new Sequelize(mysqlConfig.DB, mysqlConfig.USER, mysqlConfig.PASSWORD, {
  host: mysqlConfig.HOST,
  dialect: mysqlConfig.dialect
});

async function run(){
try {
   await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}
}


//ce Middleware permet a rendre accessible notre middleware à l'application, met des headers aux réponses
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*'); // '*' permet de donner accès a tout le monde à cet API on peut le remplacer par des URL/adressse IP pour restraindre l'accès
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next(); // ne pas oublier de le mettre pour renvoyer vers le middleware suivant
  });
  
  app.use(express.json()); // transforme l'objet de la requete en requete utilisable
  app.use(bodyParser.json()); //
  //donne le début de la route à suivre pur URL par STUFF.JS car on les a enlevées de STUFF.JS
  app.use('/images', express.static(path.join(__dirname,'images')));
  // app.use('/api/sauces', saucesRoutes);
  // app.use('/api/sauces/:id/like', saucesRoutes)
  app.use('/api/auth', userRoutes);
  app.get("/", (req, res) => {
    res.json({ message: "Welcome to BAZOOKAA application." });
  });
 
  
  module.exports = app;