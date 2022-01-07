let bcrypt = require('bcrypt')//pour update password et hasher le mot de passe
let { Comment, Post, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS

// get un seul user pour le profil
exports.profile = async(req,res)=>{
    let uuid = req.params.uuid;
    // console.log(req.body)
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
            })//FIN THEN
            .catch(error => res.status(400).json({error}));    
};//FIN - get un seul user pour le profil

//Update d'un user
exports.update = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid, active:true}}) //find et delete ancienne image
        .then( async userUpdated => {
            if(!userUpdated){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})  
            }
            //Si le user est trouvé alors :
            if(userUpdated){
                let filename = userUpdated.upload_url;

                //Si le user a un avatar uploadé mais n'envoie pas de nouveau fichier alors :
                if (fs.existsSync(filename)&&!req.file) {
                    //On update le user en gardant l'url initiale de l'avatar
                    await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, active: req.body.active}, {where:{ uuid : uuid}})
                    let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find de nouveau puis on distribue l'url d'image aux post et commentaires du user
                        await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                        await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                    return res.status(200).json(user)
                }
                //Si le user a un avatar déjà uploadé et il envoie un nouvel avatar alors :
                if(fs.existsSync(filename)) {
                    //on efface le fichier initialement uploadé par le user
                    fs.unlinkSync(filename)
                    //on update le user avec la nouvelle image reçue du front
                    await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, upload_url:req.file.path, active: req.body.active}, {where:{ uuid : uuid}})
                    let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image aux post et commentaires du user
                        await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                        await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                    return res.status(200).json(user)
                }
                //Si le user n'avait pas d'avatar initialement et n'envoie pas de fichier ou simplement n'evoit pas de fichier alors :
                if(fs.existsSync(!filename)&&!req.file || !req.file) {
                    //on update le user
                    await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, active: req.body.active}, {where:{ uuid : uuid}})
                    let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                        await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                        await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                    return res.status(200).json(user)
                }
                //tous les autres cas :
                else{
                    //on update le user et on dispatche les avatars vers les post et commentaires du user
                    await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, poste: req.body.poste, upload_url:req.file.path, active: req.body.active}, {where:{ uuid : uuid}})
                    let user = await User.findOne({where:{ uuid, active:true}}) //on attend l'update user et on find ne nouvea puis on distribue l'url d'image
                        await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                        await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                    return res.status(200).json(user)
                }
            }//FIN if USERUPDATED
    })//FIN THEN
        .catch(error => res.status(400).json({error}));
};//FIN - Update d'un user

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
                //on utilise bcrypt pour hasher le mot de passe gardé dans mysql
                let hash =  await bcrypt.hash(passwordUpdate, 14 )
                //on update le user avec le nouveau hash du mot de passe
                await User.update({ password:hash},{ where: {uuid} })
                return res.status(200).json({message:'Mot de passe mis à jour'})
            }
        })//FIN THEN
        .catch(err=> res.status(500).json({message: err.message}))
}//FIN EXPORT updatePassword

exports.deleteAvatar = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid, active:true}}) //find et delete ancienne image
    .then( async userUpdated => {
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        //Si user est trouvé alors :
        if(userUpdated){
            //on assigne upload_url avatar a filename
            let filename = userUpdated.upload_url;
            //Si le user a déja un avatar enregistré alors:
            if(fs.existsSync(filename)) {
                //On efface le fichier du back upload
                fs.unlinkSync(filename)
                //On update le user avec une url d'avatar a null
                await User.update({upload_url:null}, {where:{ uuid : uuid}})
                // on retrouve le user apres update et on le renvoit au front
                let user = await User.findOne({where:{ uuid, active:true}})
                    //on update les post et comment avec le nouveau avatar du user à null
                    await Post.update({ avatar: user.upload_url}, {where:{uuid}})
                    await Comment.update({ avatar: user.upload_url}, {where:{uuid}})
                return res.status(200).json(userUpdated)
            }
            //tous les autres cas:
            else{
                return res.status(401).json({message:"L'utilisateur n'a pas d'avatr"})
            }
        }//FIN IF USERUPDATED
    })//FIN THEN
        .catch(err=> res.status(500).json({message: err.message}))
}//FIN EXPORT deleteAvatar

exports.delete = async (req, res)=>{
    let uuid = req.params.uuid;
    //Cherche le user avec son uuid et vérifie s'il est en modération (active:true = pas en moderation)
    await User.findOne({where:{ uuid : uuid, active: true}}) 
    .then( async user => {
        //Si le user est non trouvé :
        if(!user){
            return res.status(401).json({error: 'User non trouvé!'})
        }
        //Si le user est trouvé
        if(user){
            //On update le user à active false = le rend inactif (en moderation et user_deleted: true pour qu'il n'ai plus acces a son compte et son contenu)
            await User.update({active: false, user_deleted: true, email: uuid + '-'+ user.email}, {where :{uuid: uuid}}) // modifie l'email user et le met en inactif quand il delete son profil
            return res.status(200).json({error: "Nous regrettons de vous voir partir de GROUPOMANIA. Votre profil n'est plus accessible!!"})
        }
    })//FIN THEN
};//FIN EXPORT delete


