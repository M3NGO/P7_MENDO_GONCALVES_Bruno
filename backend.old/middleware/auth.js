let jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        let token = req.headers.authorization.split(' ')[1];
        let decodedToken = jwt.verify(token, 'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr');
        let userId = decodedToken.userId;

        if(req.body.uderId && req.body.userId !== userId) {
            throw 'User ID non valable !';
        }else{}
        next();

    }catch(error) {
        res.status(401).json({error : error | 'Requete non authentifiée !'});
    }
};