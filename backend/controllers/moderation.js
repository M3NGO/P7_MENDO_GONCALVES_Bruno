let { Comment, Post, User, Comment_likes_dislikes } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.moderationUser = async (req, res) => {
    let uuid = req.body.moderator;
    await User.findOne({where:{ uuid : uuid}}) //Cherche le user avec son uuid et vérifie si modérateur
    .then( async moderator => {
        if(!moderator){
            return res.status(401).json({error: 'Moderateur non trouvé!'})
        }if(moderator && moderator.role !==2 ){
            return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
        }
        //Si l'uuid reçu du moderateur correspond bien au role 2 de moderateur alors :
        if(moderator && moderator.role === 2){//le role 2 moderateur est bien présent donc modérateur peut continuer
            let uuid = req.body.uuid
            let active = req.body.active
            await User.findOne({where:{ uuid : uuid}})
            .then( async userModerated=>{
                // console.log(userModerated)
                if(!userModerated){
                    return res.status(401).json({error: 'Utilisateur non trouvé!'})
                }
                //si le user est trouvé et qu'il est bien user role 1 alors:
                if(userModerated && userModerated.role === 1){
                    //on met a jour son statut d'actif
                    await User.update({active: active}, {where :{uuid: uuid}})
                    //on trouve le user modifié et on l'envoit au front
                    let userUpdated = await User.findOne({where:{ uuid : uuid}})
                    return res.status(200).json(userUpdated)
                }
 
            })//FIN THEN
            .catch(error => res.status(400).json({error}));
        }//FIN si le user qui envoit la requete est bien moderateur

    })//fin fonction then
    .catch(error => res.status(400).json({error}));
}//FIN EXPORT moderationUser

exports.moderationPost = async (req, res) => {
    let uuid = req.body.uuid;
    await User.findOne({where:{ uuid : uuid}}) //cherche User parmi les moderateurs
        .then( async moderator => {
            if(!moderator){
                return res.status(401).json({error: 'Moderateur non trouvé!'})
            }if(moderator && moderator.role !==2 ){
                return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
            }
            //Si le user qui envoit la requete est bien moderateur avec un role 2 alors:
            if(moderator && moderator.role === 2){//le role 2 moderateur est bien présent donc modérateur peut continuer
                let post_id = req.body.post_id
                let active = req.body.active
                await Post.findOne({where:{ id :post_id}})
                    .then( async postModerated=>{
                        if(!postModerated){
                            return res.status(401).json({error: 'Post non trouvé!'})
                        } if(postModerated){// modère automatiquement le post et tous les comments liés au post
                            await Post.update({active: active}, {where :{id:post_id}})
                            return res.status(200).json(postModerated)
                        }
                    })//FIN THEN postmoderated
                    .catch(error => res.status(400).json({error}));
            }//FIN if le user est bien moderateur

    })//FIN THEN
    .catch(error => res.status(400).json({error}));
}//FIN EXPORT moderationPost

exports.moderationComment = async (req, res) => {
    let uuid = req.body.uuid;
    await User.findOne({where:{ uuid : uuid}})//cherche User parmi les moderateurs
    .then( async moderator => {
        if(!moderator){
            return res.status(401).json({error: 'Moderateur non trouvé!'})
        }if(moderator && moderator.role !==2 ){
            return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
        }
        if(moderator && moderator.role === 2){ //le role 2 moderateur est bien présent donc modérateur peut continuer
            let comment_id = req.body.comment_id
            let active = req.body.active
            await Comment.findOne({where:{ id : comment_id}})
            .then( async commentModerated=>{
                if(!commentModerated){
                    return res.status(401).json({error: 'Commentaire non trouvé!'})
                } if(commentModerated){
                    await Comment.update({active: active}, {where :{id: comment_id}})
                    await Comment_likes_dislikes.update({active: active}, {where :{comment_id: comment_id}})
                    return res.status(200).json(commentModerated)
                }
            })//FIN THEN commentmoderated
            .catch(error => res.status(400).json({error}));
        }//FIN if le user envoyant la requete est bien un moderateur role 2

    })//FIN THEN moderator
    .catch(error => res.status(400).json({error}));
}//FIN EXPORT moderationComment

exports.getModeratedPosts = async (req,res) => {
    //on va chercher les posts étant non actifs dans la BDD et on va les envoyer avec les commentaires liés au front
    try{
        let posts = await Post.findAll({where: {active: false}, include:['comment', 'postlikes', 'commentlikes']})
        return res.json(posts)
    }catch(err){
        // console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getModeratedPosts

exports.getModeratedComments = async (req,res) => {
    //on va chercher les commentaires étant non actifs dans la BDD et on va les envoyer au front
    try{
        let comments = await Comment.findAll({where: {active: false}, include:['commentlikes']})
        return res.json(comments)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getModeratedComments

exports.getAllUsersDeleted = async(req,res)=>{
    //ON va chercher tous les users qui sont en statut inactifs et qui se sont auto supprimés et  les servir au front
    try{
        let users = await User.findAll({where: {active: false, user_deleted: true}},{include:['comment','post']})
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getAllUsersDeleted

exports.getModeratedUsers = async(req,res)=>{
    // on va checher tous les users qui sont en statu inactif et qui ne se sont pas auto supprimés (sont donc en moderation), puis les servir au front
    try{
        let users = await User.findAll({where: {active: false, user_deleted: false}},{include:['comment','post']})
        return res.json(users)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getModeratedUsers


exports.deleteUser = async (req, res)=>{
    //delete définitivement le uset et son contenu de la BDD + du dossier uploads
    let uuid = req.params.uuid;
    await User.findOne({where:{uuid, active: false}})
        .then(async userdelete=>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            // si on trouve le uuid du user a delete alors:
            if(userdelete){
                let folderName = './uploads/'+userdelete.uuid
                //on delete les dossiers upload du user créés a son inscription ainsi que tout son contenu (images/vidéos)
                fs.rm(folderName,{ recursive: true},async (err)=>{
                    if (err) console.log(err); console.log('Fichier Post effacé du back')})
                    //on efface le user et tout son contenu lié de mysql
                    await User.destroy({where:{uuid, active: false}})
                    //on envoie la liste des users en moderation au front:
                    let usersToBeModerated = await User.findAll({where: {active: false, user_deleted: false}},{include:['comment','post']})
                    return res.status(200).json(usersToBeModerated)
                }
            })//FIN THEN
            .catch(error => res.status(400).json({error}));
};//FIN EXPORT deleteUser




