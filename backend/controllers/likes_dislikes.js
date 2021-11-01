let { Post_likes_dislikes, Comment_likes_dislikes } = require('../models')

exports.postLikesDislikes = async (req, res)=>{
    let postLikes = req.body.likes
    let uuid = req.body.uuid
    let post_id = req.params.id
  
    if(postLikes === 1){
        await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            .then(async ()=>{
                await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
                    .then(() => res.status(200).json({message: 'Hmmm je Like!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
      }
  
    else if(postLikes === -1){
        await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            .then(async()=>{
                await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
                    .then(() => res.status(200).json({message: 'Beurk je Dislike!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
    }
    else{
        await Post_likes_dislikes.findAll({where : {uuid: uuid, post_id: post_id}})
            .then(likesDislikesdelete =>{
                if(!likesDislikesdelete){
                    return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
                }
                Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
                .then(()=> res.status(200).json({message :"Vos likes/dislikes ont bien été éffacés!"}))
            })
            .catch(err=> res.status(500).json({message: err.message}))

    }
}

exports.commentLikesDislikes = async (req, res)=>{
    let commentLikes = req.body.likes
    let uuid = req.body.uuid
    let comment_id = req.params.id
  
    if(commentLikes === 1){
        await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
            .then(async ()=>{
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id})
                    .then(() => res.status(200).json({message: 'Hmmm je Like!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
      }
  
    else if(commentLikes === -1){
        await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
            .then(async()=>{
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id})
                    .then(() => res.status(200).json({message: 'Beurk je Dislike!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
    }
    else{
        await Comment_likes_dislikes.findAll({where : {uuid: uuid, comment_id: comment_id}})
            .then(likesDislikesdelete =>{
                if(!likesDislikesdelete){
                    return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
                }
                Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
                .then(()=> res.status(200).json({message :"Vos likes/dislikes ont bien été éffacés!"}))
            })
            .catch(err=> res.status(500).json({message: err.message}))

    }
}