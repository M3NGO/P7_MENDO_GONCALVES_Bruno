let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models


//signup/Creation des new users
exports.signup = async (req,res) => {
    let hash =  await bcrypt.hash(req.body.password, 14 )
     try { 
         let user = await User.create({ 
             firstname: req.body.firstname.split(' ').join('_'), //split join pour eviter les espaces dans les url
             lastname:req.body.lastname.split(' ').join('_'), //penser a gérer cela dans le front pour remplacer les underscore par des espaces a nouveau
             email:req.body.email, 
             password:hash,
             role:req.body.role}) //{ firstname, lastname, email, password, role} objet json envoyé dans body request
         return res.json(user) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 };
//FIN - signup/Creation des new users

// LOGIN des users
exports.login = (req, res, next) => {
    User.findOne({where:{email: req.body.email}})
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
                    uuid: user.uuid,
                    token: jwt.sign(
                        {uuid: user.uuid},
                        'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr', //clé d'encodage du token a mettre aléatoirement faut qu'elle soit très longue
                        {expiresIn: '12h'}
                    ), // installer npm install --save  jsonwebtoken pour créer les TOKEN puis les vérifier
                });       
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// FIN - LOGIN des users