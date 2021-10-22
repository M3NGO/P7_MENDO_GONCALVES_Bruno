// creation du serveur backend
// LE NECESSAIRE POUR DEVELOPPER UN SERVEUR BACK-END SECURE (on peut développer un peu plus le SWITCH)
let http = require('http');
let app = require('./app');
                    
// NormalizePort revoie un port valide qu'il soit fourni sous forme d'un numéro ou d'une chaîne
let normalizePort = val => {
    let port = parseInt(val, 10);
                            
        if (isNaN(port)) {
            return val;
        }
        if (port >= 0) {
            return port;
        }
            return false;
};
                    
let port = normalizePort(process.env.PORT || '3000');// ici on change le port où le backend est présent (on peut changer 3000 par nimporte quoi)
                        
app.set('port', port);
// fonction errorHandler recherche les différentes erreurs et les gère de maniere appropriée
let errorHandler = error => {
    if (error.syscall !== 'listen') {
        throw error;
    }
    let address = server.address();
    let bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
                        
    switch (error.code) {
                        
        case 'EACCES':
        console.error(bind + ' requires elevated privileges.');
        process.exit(1);
        break;
        case 'EADDRINUSE':
        console.error(bind + ' is already in use.');
        process.exit(1);       
        break;
        default:
        throw error;
    }// FIN - let bind switch error
                    
};// FIN - let errorHandler = error
                    
let server = http.createServer(app);
                    
//serveur ON
server.on('error', errorHandler); // si serveur ON mais errorHandler se déclanche alors on aura la fonction de errorHandler qui s'effectue
server.on('listening', () => { // serveur ON, si tout se passe bien on a un console log avec le port d'écoute serveur affiché
    let address = server.address();
    let bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
    console.log('Listening on ' + bind);
});// FIN - error Handler listening

//Version sequelize.sync pour créer table dans BDD
// let { sequelize } = require('./models')     //lance synchro sequelize            
// server.listen(port, async () =>{
//     await sequelize.sync({force: true});
//     console.log ('Mysql Synchronisée sur')
// }); // serveur écoute le port définit au serveur + synchronise asynchrone MYSQL
//FIN - Version sequelize.sync pour créer table dans BDD

let { sequelize } = require('./models')     //lance synchro sequelize            
server.listen(port, async () =>{
    await sequelize.authenticate();
    console.log ('Mysql Synchronisée')
}); // serveur écoute le port définit au serveur + synchronise asynchrone MYSQL


                    
// process.env.PORT pour dans le cas où plateforme de déploiement propose un port par défaut, c'est celui-ci qu'on écoutera 
                    
// nodemon server dans le cd backend pour lancer node backend
// dépendance de node
// sert à :
//      - avoir le node server qui se met a jour à la sauvegarde des fichiers JS
// s'installe via commande : sudo npm install -g nodemon  // le -g pour installation globale sur le mac et non seulement dans le projet

// FIN - LE NECESSAIRE POUR DEVELOPPER UN SERVEUR BACK-END SECURE
                    