// let { Sequelize } = require('sequelize');
// let sequelize = new Sequelize("groupomania", "coco", "ofuzinfzà@—çd&@)dzdzn-)`qeff", {
//   host: "localhost",
//   dialect: "mysql"
// });

let mysqlDatabase = {
    HOST: "localhost",
    USER: "coco",
    PASSWORD: "ofuzinfzà@—çd&@)dzdzn-)`qeff",
    DB: "groupomania",
    dialect: "mysql",
};
// async function run(){
//     try {
//        await sequelize.authenticate();
//       console.log('Connection has been established successfully.');
//     } catch (error) {
//       console.error('Unable to connect to the database:', error);
//     }
//     }
//     run();

module.exports = mysqlDatabase;