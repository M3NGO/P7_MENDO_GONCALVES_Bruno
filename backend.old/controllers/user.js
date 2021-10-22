let bcrypt = require('bcrypt')// ne pas oublier d'installer bcrypt pour le hash mdp : npm install --save bcrypt
let jwt = require('jsonwebtoken')
let User = require('../models/User');

const { Sequelize } = require('sequelize');
exports.signup = (req, res, next) => {
bcrypt.hash(req.body.password, 14 ) // methode asynchrone donc => then et catch // bcrypt.hash pour hasher mdp / le 14 c'est pour indiquer le nombre de fois qu'on fait tourner l'algorithm de hash minimum 10 plus c'est mieux mais plus lent
.then(hash =>{
    let user = User.create({
        id: req.body.id,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hash // on utilise hash pour stocker le hash du mot de passe et non le mdp en clair
    });
    user.save()
        .then(() => res.status(201).json({message: 'Utilisateur créé en MySQL!!'}))
        .catch(err => res.status(400).json({error }))
})
.catch(error => res.status(500).json({error})); //erreur 500 pour erreur serveur

};

exports.login = (req, res, next) => {
    User.findOne({where: {id: 1}})
    .then(user => {
        if(!user){
            return res.status(401).json({error :'Utilisateur non trouvé!'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error :'Mot de passe incorrect! '});
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign(
                        { userId: user._id},
                        'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr', //clé d'encodage du token a mettre aléatoirement faut qu'elle soit très longue
                        {expiresIn: '12h'}
                    ), // installer npm install --save  jsonwebtoken pour créer les TOKEN puis les vérifier
                });       
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};