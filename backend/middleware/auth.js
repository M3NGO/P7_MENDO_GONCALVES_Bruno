let jwt = require('jsonwebtoken'); //utilisé poir créer les token d'accès

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(token, 'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr'); //'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr' clé de hashage du token
        let userId = decodedToken.userId;

        if(req.body.uderId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }else{}
        next();

    }catch(error) {
        res.status(401).json({error : 'Requete non authentifiée ! Veuillez vous authentifier'});
    }
};//FIN EXPORT module