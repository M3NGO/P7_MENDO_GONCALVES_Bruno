let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { sequelize, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS

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

//Update d'un user
exports.update = async (req, res, next) => {
    let uuid = req.params.uuid;
    // let email = req.body.email;
    // let hash =  await bcrypt.hash(req.body.password, 14 )
    await User.findOne({where:{ uuid : uuid}}) //find et delete ancienne image
    .then( async userUpdated => {
        let filename = userUpdated.imageurl;
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
    }
        //a revoir
            if (fs.existsSync(filename)&&req.file == null) { //si imageurl est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur imageurl a null dans mysql
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, imageurl:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
              //file exists
            } if(fs.existsSync(filename)) { //si imageurl est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans imageurl de mysql (via req.file.path)
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, imageurl:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            if(req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans imageurl mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, imageurl:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            else{ //si le fichier de requete est présent et que imageurl est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, imageurl:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
        })
        .catch(error => res.status(400).json({error}));
    };
//FIN - Update d'un user

//Delete user via uuid
exports.delete = async(req, res) =>{
    let uuid = req.body.uuid;
    User.findOne({ where: {uuid} })
        .then(userdelete =>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            let filename = userdelete.imageurl; //delete l'image avatar du user
            fs.unlinkSync(filename)//delete l'image avatar du user
            
            User.destroy({ where: {uuid:uuid} })
            .then(()=> res.status(200).json({message :'Utilisateur a été éffacé!'}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};
//FIN - Delete user via uuid