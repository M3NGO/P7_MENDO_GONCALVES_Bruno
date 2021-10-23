let express = require('express'); //librairie de Javascript
let app = express();
let jwt = require('jsonwebtoken')

let bcrypt = require('bcrypt')
let { sequelize, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models

//signup des new users
exports.signup = (async (req,res) => {
    let hash =  await bcrypt.hash(req.body.password, 14 )
 
     try { 
         let user = await User.create({ firstname: req.body.firstname, lastname:req.body.lastname, email:req.body.email, password:hash, role:req.body.role}) //{ firstname, lastname, email, password, role} objet json envoyé dans body request
         return res.json(user) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 })
//FIN - signup des new users

// LOGIN des users
exports.login = (req, res, next) => {
    User.findOne({email: req.body.email})
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
// FIN - LOGIN des users

// get un seul user pour le profil
exports.profile = (async(req,res)=>{
    let email = req.body.email;
    try{
        let userProfile = await User.findOne({ 
            where: { email : email},
        })
        return res.json(userProfile)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
})
//FIN - get un seul user pour le profil

// get tous les users (a voir si utile pour l'appli)
 exports.getallusers = (async(req,res)=>{
    try{
        let users = await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
})
//FIN - get tous les users (a voir si utile pour l'appli)