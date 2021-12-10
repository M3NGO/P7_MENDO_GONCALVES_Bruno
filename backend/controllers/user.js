let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { Comment, Post, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS
const { json } = require('body-parser');

// get un seul user pour le profil
exports.profile = async(req,res)=>{
    let uuid = req.params.uuid;
    // let lastname = req.params.lastname;
    // let email = req.body.email;
console.log(req.body)
        await User.findOne({ 
            where: {uuid, active:true}, // si user pas actif alors son profil n'apparait pas
            include:['post', 'comment', 'postlikes','commentlikes'], //on récupère tous les post, comment, likes du user via les alias mis dans models
        })//sans uui + email dans la requete => requete rejetée
            .then(async userProfile =>{
                if(!userProfile){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }else{
                return res.json(userProfile)
            }
        })
            .catch(error => res.status(400).json({error}));
        
};
//FIN - get un seul user pour le profil

//Update d'un user
exports.update = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid, active:true}}) //find et delete ancienne image
    .then( async userUpdated => {
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
        
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
            
    }if(userUpdated){
    let filename = userUpdated.upload_url;
    //block gestion des upload avatar :

            if (fs.existsSync(filename)&&!req.file) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
                // fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, active: req.body.active}, {where:{ uuid : uuid}})
                let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                    await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                    await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                return res.status(200).json(user)
              //file exists
            } if(fs.existsSync(filename)) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, upload_url:req.file.path, active: req.body.active}, {where:{ uuid : uuid}})
                let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                    await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                    await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                return res.status(200).json(user)
            }
            if(fs.existsSync(!filename)&&!req.file || !req.file) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, active: req.body.active}, {where:{ uuid : uuid}})
                let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                    await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                    await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                return res.status(200).json(user)
            }
            else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, upload_url:req.file.path, active: req.body.active}, {where:{ uuid : uuid}})
                let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                    await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                    await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                return res.status(200).json(user)
            }
        }
    })//else
        .catch(error => res.status(400).json({error}));
    };
//FIN - Update d'un user


exports.updatePassword = async (req, res)=>{
    let uuid = req.params.uuid;
    User.findOne({ where: {uuid, active:true} })
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

exports.deleteAvatar = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid, active:true}}) //find et delete ancienne image
    .then( async userUpdated => {
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
        
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
            
    }if(userUpdated){
    let filename = userUpdated.upload_url;
    if(fs.existsSync(filename)) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
        fs.unlinkSync(filename)
        await User.update({upload_url:null}, {where:{ uuid : uuid}})
        let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
            await Post.update({ avatar: user.upload_url}, {where:{uuid}})
            await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
        return res.status(200).json(userUpdated)
    }else{
        return res.status(401).json({message:"L'utilisateur n'a pas d'avatr"})
    }
}
    }).catch(err=> res.status(500).json({message: err.message}))
}


exports.delete = async (req, res)=>{
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid : uuid, active: true}}) //Cherche le user avec son uuid et vérifie si modérateur
    .then( async user => {
        if(!user){
            return res.status(401).json({error: 'User non trouvé!'})
        }if(user){
            await User.update({active: false, user_deleted: true, email: uuid + '-'+ user.email}, {where :{uuid: uuid}}) // modifie l'email user et le met en inactif quand il delete son profil
            return res.status(200).json({error: "Nous regrettons de vous voir partir de GROUPOMANIA. Votre profil n'est plus accessible!!"})
        }
    })
};


