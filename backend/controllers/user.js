let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { sequelize, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models

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

// get un seul user pour le profil
exports.profile = async(req,res)=>{
    let firstname = req.params.firstname;
    let lastname = req.params.lastname;
    let email = req.body.email;
    try{
        let userProfile = await User.findOne({ 
            where: { firstname,lastname, email}, // on oblige le front a envoyer uuid + email du user dans la requete
        })//sans uui + email dans la requete => requete rejetée
            if(!userProfile){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
        return res.json(userProfile)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
//FIN - get un seul user pour le profil

// get tous les users (a voir si utile pour l'appli)
 exports.getallusers = async(req,res)=>{
    try{
        let users = await User.findAll()
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
//FIN - get tous les users (a voir si utile pour l'appli)

exports.update = async (req, res, next) => {
    let uuid = req.body.uuid;
    let email = req.body.email;
    let hash =  await bcrypt.hash(req.body.password, 14 )
    let userUpdated = await User.findOne({where:{ uuid : uuid, email : email}}) //find et delete ancienne image
        if(!userUpdated){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        //a revoir
       await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, password:hash, upload_url: req.body.upload_url}, {where:{ uuid : uuid}})
            .then(() => res.status(200).json({message: 'Profil modifié!!!'}))
            .catch(error => res.status(400).json({error}));
};

//Delete user via uuid
exports.delete = async(req, res) =>{
    let uuid = req.body.uuid;
    User.findOne({ where: {uuid} })
        .then(userdelete =>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            //penser a rajouter ici unlink les images des users profile
            User.destroy({ where: {uuid:uuid} })
            .then(()=> res.status(200).json({message :'Utilisateur a été éffacé!'}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};
//FIN - Delete user via uuid