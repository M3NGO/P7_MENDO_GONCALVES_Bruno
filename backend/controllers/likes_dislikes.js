let { Post_likes_dislikes, Comment_likes_dislikes, Comment } = require('../models')

exports.postLikesDislikes = async (req, res)=>{
    let postLikes = req.body.likes
    let uuid = req.body.uuid
    let post_id = req.params.id
  
    if(postLikes === 1){
        await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            .then(async ()=>{
               await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
                    .then(() => res.status(200).json(Post_likes_dislikes))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
      }
  
    else if(postLikes === -1){
        await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            .then(async()=>{
                await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
                    .then(() => res.status(200).json(Post_likes_dislikes))
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
                .then(()=> res.status(200).json(Post_likes_dislikes))
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
                let comment = await Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
                let post_id = comment.post_id
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id:post_id})
                    .then(() => res.status(200).json(Comment_likes_dislikes))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
      }
  
    else if(commentLikes === -1){
        await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
            .then(async()=>{
                let comment = await Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
                let post_id = comment.post_id
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id:post_id})
                    .then(() => res.status(200).json(Comment_likes_dislikes))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
    }
    else{
        await Comment_likes_dislikes.findAll({where : {uuid: uuid, comment_id: comment_id}})
            .then(likesDislikesdelete =>{
                let comment = Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
                let post_id = comment.post_id
                if(!likesDislikesdelete){
                    return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
                }
                Comment_likes_dislikes.destroy({where:{ uuid: uuid,comment_id: comment_id }||{uuid: uuid,post_id: post_id} })
                .then(()=> res.status(200).json(Comment_likes_dislikes))
            })
            .catch(err=> res.status(500).json({message: err.message}))

    }
}