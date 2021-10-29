let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS

// get un seul user pour le profil
exports.profile = async(req,res)=>{
    let uuid = req.params.uuid;
    // let lastname = req.params.lastname;
    // let email = req.body.email;
    try{
        let userProfile = await User.findOne({ 
            where: {uuid}, // on oblige le front a envoyer uuid + email du user dans la requete
            include:['post', 'comment', 'postlikes','commentlikes'], //on récupère tous les post, comment, likes du user via les alias mis dans models
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

//Update d'un user
exports.update = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid : uuid}}) //find et delete ancienne image
    .then( async userUpdated => {
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
    }
    let filename = userUpdated.imageurl;
    //block gestion des upload avatar :
            if (fs.existsSync(filename)&&req.file == null&&req.body.password!==null) { //si imageurl est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur imageurl a null dans mysql
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, email:req.body.email,imageurl:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
              //file exists
            } if(fs.existsSync(filename)&&req.file !== null&&req.body.password!==null) { //si imageurl est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans imageurl de mysql (via req.file.path)
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, imageurl:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            if(req.file == null&&req.body.password!==null) { //si le fichier de requete est null ou undefined alors on renseigne null dans imageurl mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, imageurl:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            else{ //si le fichier de requete est présent et que imageurl est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, imageurl:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
        })
        .catch(error => res.status(400).json({error}));
    };
//FIN - Update d'un user

//Delete user via uuid
exports.delete = async(req, res) =>{
    let uuid = req.params.uuid;
    User.findOne({ where: {uuid} })
        .then(userdelete =>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            let filename = userdelete.imageurl; //delete l'image avatar du user
            fs.unlinkSync(filename)//delete l'image avatar du user
            
            User.destroy({ where: {uuid:uuid} })
            .then(()=> res.status(200).json({message :'Le profil utilisateur ainsi que tout son contenu a été éffacé!'}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};
//FIN - Delete user via uuid

exports.updatePassword = async (req, res)=>{
    let uuid = req.params.uuid;
    User.findOne({ where: {uuid} })
        .then(async userUpdate =>{
            if(!userUpdate){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            //verif si password null
            let passwordUpdate = req.body.password;
            if(!passwordUpdate) { // si passwordUpdate est null alors on fait rien
                return res.status(401).json({error: 'le mot de passe ne peut être vide'})
            //FIN - verif si password null
            }else{
                let hash =  await bcrypt.hash(passwordUpdate, 14 )
                await User.update({ password:hash},{ where: {uuid} })
                return res.status(200).json({message:'Mot de passe mis à jour'})
            }
        })//then
        .catch(err=> res.status(500).json({message: err.message}))
}
