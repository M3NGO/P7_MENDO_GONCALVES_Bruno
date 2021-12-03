let { Comment, Post, User, Post_likes_dislikes, Comment_likes_dislikes } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.moderationUser = async (req, res) => {
    let uuid = req.body.uuid;
    await User.findOne({where:{ uuid : uuid}}) //Cherche le user avec son uuid et vérifie si modérateur
    .then( async moderator => {
        if(!moderator){
            return res.status(401).json({error: 'Moderateur non trouvé!'})
        }if(moderator && moderator.role !==2 ){
            return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
        }
        if(moderator && moderator.role === 2){//le role 2 moderateur est bien présent donc modérateur peut continuer
            let uuid = req.body.uuid
            let active = req.body.active
            await User.findOne({where:{ uuid : uuid}})
            .then( async userModerated=>{
                console.log(userModerated)
                if(!userModerated){
                    return res.status(401).json({error: 'Utilisateur non trouvé!'})
                } if(userModerated && userModerated.role === 1){
                    await User.update({active: active}, {where :{uuid: uuid}})
                    return res.status(200).json({message:'Utilisateur updaté par modérateur'})
                }
 
            }).catch(error => res.status(400).json({error}));
        }

    })//fin fonction then
    .catch(error => res.status(400).json({error}));
}//fin fonction active


exports.moderationPost = async (req, res) => {
    let uuid = req.body.uuid;
    await User.findOne({where:{ uuid : uuid}}) //cherche User parmi les moderateurs
    .then( async moderator => {
        if(!moderator){
            return res.status(401).json({error: 'Moderateur non trouvé!'})
        }if(moderator && moderator.role !==2 ){
            return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
        }
        if(moderator && moderator.role === 2){//le role 2 moderateur est bien présent donc modérateur peut continuer
            let post_id = req.body.post_id
            let active = req.body.active
            await Post.findOne({where:{ id :post_id}})
            .then( async postModerated=>{
                if(!postModerated){
                    return res.status(401).json({error: 'Post non trouvé!'})
                } if(postModerated){// modère automatiquement le post et tous les comments liés au post
                    await Post.update({active: active}, {where :{id:post_id}})
                    await Post_likes_dislikes.update({active: active}, {where :{post_id:post_id}})
                    await Comment.update({active: active}, {where:{post_id:post_id}})
                    await Comment_likes_dislikes.update({active: active}, {where:{ post_id : post_id}})
                    return res.status(200).json({message:'Post modéré par modérateur'})
                }
 
            }).catch(error => res.status(400).json({error}));
        }

    })//fin fonction then
    .catch(error => res.status(400).json({error}));
}//fin fonction active



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
                    return res.status(200).json({message:'Commentaire modéré par modérateur'})
                }
 
            }).catch(error => res.status(400).json({error}));
        }

    })//fin fonction then
    .catch(error => res.status(400).json({error}));
}//fin fonction active


exports.deleteUser = async (req, res)=>{
    let uuid = req.params.uuid;
    // await User.findOne({where:{ uuid : uuid, active: true}}) //Cherche le user avec son uuid et vérifie si modérateur
    // .then( async moderator => {
    //     if(!moderator){
    //         return res.status(401).json({error: 'Moderateur non trouvé!'})
    //     }if(moderator && moderator.role !==2 ){
    //         return res.status(401).json({error: "Vous n'êtes pas modérateur, vous ne pouvez pas faire cette action"})
    //     }
    //     if(moderator && moderator.role === 2){
    //         let uuid = req.body.uuid
            await User.findOne({where:{uuid, active: false}})
            .then(async userdelete=>{
                if(!userdelete){
                    return res.status(401).json({error: 'Utilisateur non trouvé!'})
                }
                if(userdelete){
                    let folderName = '../uploads/'+userdelete.uuid
                    fs.rm(folderName,{ recursive: true},async (err)=>{
                        if (err) console.log(err); console.log('Fichier Post effacé du back')})
                    await User.destroy({where:{uuid, active: false}})
                    // on laisse les post et commentaires du user pour garder les infos sur le site puisque site interne a l'entreprise
                    return res.status(200).json({message:"L'utilsiateur ainsi que tout son contenu a été éffacé"})

                }
            }).catch(error => res.status(400).json({error}));

    //     }
    // }).catch(error => res.status(400).json({error}));
};




