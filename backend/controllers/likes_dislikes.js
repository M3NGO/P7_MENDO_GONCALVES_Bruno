let { Post_likes_dislikes, Comment_likes_dislikes, Comment, Post } = require('../models')

exports.postLikesDislikes = async (req, res)=>{
    let postLikes = req.body.likes
    let uuid = req.body.uuid
    let post_id = req.params.id
    await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
        .then( async reponse =>{
            //si find0ne ne trouve pas le post alors on va créer ce like :
            if(!reponse && postLikes === 1){
                //incrémentation du nombre de likes dans la table post
                await Post.increment('nbre_likes',{ by: 1, where:{id: post_id}})
                await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
                //on va trouver le post liké une fois updaté pour l'envoyer au front
                let postupdated = await Post.findOne({ where: {uuid: uuid, id: post_id} })
                return res.status(200).json(postupdated) 
            }
            //si find0ne ne trouve pas le post alors on va créer ce dislike :
            if(!reponse && postLikes === -1){
                await Post.increment('nbre_dislikes',{ by: 1, where:{id: post_id}})
                await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
                //On va trouver le post disliké et on va l'envoyer au front
                let postupdated = await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
                return res.status(200).json(postupdated)
            }
            //si findone a trouvé un dislike et le front envoit un like:
            else if(reponse.dislikes === 1 && postLikes === 1){
                //on décrémente le nombre de dislikes de 1 sur le post
                await Post.decrement('nbre_dislikes',{ by: 1, where:{id: post_id}})
                //on incrémente le nombre de likes de 1 sur le post
                await Post.increment('nbre_likes',{ by: 1, where:{id: post_id}})
                //on efface de mysql le dislike précédent
                await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
                //on créé un like sur le post
                await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
                //On va trouver le post liké et on va l'envoyer au front
                let postupdated = await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
                return res.status(200).json(postupdated)
            }
            //si findone a trouvé un like et le front envoit un dislike:
            else if(reponse.likes === 1 && postLikes === -1){
                //on va décrémenter les likes de 1 sue le post
                await Post.decrement('nbre_likes',{ by: 1, where:{id: post_id}})
                //on va incrémenter les dislikes de 1 sur le post
                await Post.increment('nbre_dislikes',{ by: 1, where:{id: post_id}})
                //on va effacer le postlikesdislikes
                await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
                //On va créér un nouveau postlikesdislikes en inversant le sens du nombre car on reçoit -1 (on veut enregistrer 1)
                await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
                //On va trouver le post disliké et on va l'envoyer au front
                let postupdated = await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
                return res.status(200).json(postupdated)
            }
            //si findone a trouvé un like et le front envoit un 0:
            else if(reponse.likes === 1 && postLikes === 0){
                //on décrémente les likes du post de 1
                await Post.decrement('nbre_likes',{ by: 1, where:{id: post_id}})
                //on efface le like puisque on ne like plus en envoyant un 0
                await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
                // On va trouver le post qu'on ne like plus et on va l'envoyer au front
                let postupdated = await Post_likes_dislikes.findAll({where: {active: true}})
                return res.status(200).json(postupdated)
            }
            //si findone a trouvé un dislike et le front envoit un 0:
            else if(reponse.dislikes === 1 && postLikes === 0){
                //on décrémente les dislikes du post de 1
                await Post.decrement('nbre_dislikes',{ by: 1, where:{id: post_id}})
                //On efface le postlikesdislikes
                await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
                // On va trouver le post qu'on ne dislike plus et on va l'envoyer au front
                let postupdated = await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
                return res.status(200).json(postupdated)
            }
        })//FIN THEN 
        .catch(error => res.status(400).json({error}));
}//FIN EXPORT postLikesDislikes


exports.commentLikesDislikes = async (req, res)=>{
    let commentLikes = req.body.likes
    let uuid = req.body.uuid
    let comment_id = req.params.id
    let post_id = req.body.post_id
    await Comment_likes_dislikes.findOne({ where: {uuid: uuid, comment_id: comment_id, post_id: post_id} })

        .then( async reponse =>{
            //si find0ne ne trouve pas le commentaire et on reçoit un like du front alors:
            if(!reponse && commentLikes === 1){
                //on incrémente le nombre de likes du commentaire
                await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
                //On créé ce like dans table Comment_likes_dislikes mysql
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id: post_id})
                //On trouve le post auquel appartien le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            } 
            //si find0ne ne trouve pas le commentaire et on reçoit un dislike du front alors:
            if(!reponse && commentLikes === -1){
                //on va incrémenter le nomnbre de dislikes du commentaire
                await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                //on va créér le dislike dans la table mysql
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id: post_id})
                // On trouve le post auquel appartien le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si find0ne trouve le commentaire avec un dislike et on reçoit un like du front alors:
            else if(reponse.dislikes === 1 && commentLikes === 1){
                //On va décrémenter le nombre de dislikes de 1
                await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                //On incrémente le nombre de likes du commentaire de 1
                await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
                //on efface de la table mysql le dislike initial
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                //on créé un like dans la table mysql pour le commentaire
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id: post_id})
                // On trouve le post auquel appartien le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si find0ne trouve le commentaire avec un like et on reçoit un dislike du front alors:
            else if(reponse.likes === 1 && commentLikes === -1){
                //On décrémente le nombre de likes de 1 du commentaire
                await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
                //On incrémente le nombre de dislikes de 1 du commentaire
                await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                //on efface le like de la table comment_likes_dislikes
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                //on créé un dislikes de 1 dans la table en inversant le sens du chiffre 1 reçu du front
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id: post_id})
                //on trouve le post auquel appartient le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si find0ne trouve le commentaire avec un like et on reçoit 0 du front:
            else if(reponse.likes === 1 && commentLikes === 0){
                //on décrémente les likes du commentaire
                await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
                //on efface le like de la table mysq
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                // on trouve le post auquel appartient le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si find0ne trouve le commentaire avec un dislike et on reçoit 0 du front:
            else if(reponse.dislikes === 1 && commentLikes === 0){
                //on décrémente les dislikes du commentaire
                await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                //on efface le dislike de la table mysq
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                //on trouve le post auquel appartient le commentaire et on l'envoit au front
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
        }) //FIN THEN
        .catch(error => res.status(400).json({error}));
}//FIN EXPORT commentLikesDislikes

exports.getCommentLikesDislikes = async (req, res)=>{
    try{
        let commentLikesDislikes = await Comment_likes_dislikes.findAll({where: {active: true}})
        return res.json(commentLikesDislikes)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getCommentLikesDislikes

exports.getPostLikesDislikes = async (req, res)=>{
    try{
        let postLikesDislikes = await Post_likes_dislikes.findAll({where: {active: true}})
        return res.json(postLikesDislikes)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getPostLikesDislikes