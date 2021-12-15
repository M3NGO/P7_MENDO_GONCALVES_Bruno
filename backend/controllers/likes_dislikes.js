let { Post_likes_dislikes, Comment_likes_dislikes, Comment, Post } = require('../models')

exports.postLikesDislikes = async (req, res)=>{
    let postLikes = req.body.likes
    let uuid = req.body.uuid
    let post_id = req.params.id
    await Post_likes_dislikes.findOne({ where: {uuid: uuid, post_id: post_id} })
    .then( async reponse =>{
        //si find0ne ne trouve pas le post alors:
        if(!reponse && postLikes === 1){
            await Post.increment('nbre_likes',{ by: 1, where:{id: post_id}})
            await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
            // let postlikesupdated = await Post_likes_dislikes.findOne({where:{ uuid: uuid, post_id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=1'+postupdated)
            return res.status(200).json(postupdated)

        } if(!reponse && postLikes === -1){
            await Post.increment('nbre_dislikes',{ by: 1, where:{id: post_id}})
           
            await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=4'+postupdated)
            return res.status(200).json(postupdated)

        }else if(reponse.dislikes === 1 && postLikes === 1){
            await Post.decrement('nbre_dislikes',{ by: 1, where:{id: post_id}})
            await Post.increment('nbre_likes',{ by: 1, where:{id: post_id}})
            await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=2'+postupdated)
            return res.status(200).json(postupdated)
        }else if(reponse.likes === 1 && postLikes === 1){
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=3'+postupdated)
            return res.status(200).json(postupdated)
        }else if(reponse.likes === 1 && postLikes === -1){
            await Post.decrement('nbre_likes',{ by: 1, where:{id: post_id}})
            await Post.increment('nbre_dislikes',{ by: 1, where:{id: post_id}})
            await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            console.log('consolelog=5'+postupdated)
            return res.status(200).json(postupdated)
        }else if(reponse.dislikes === 1 && postLikes === -1){
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=6'+postupdated)
            return res.status(200).json(postupdated)
        }else if(reponse.likes === 1 && postLikes === 0){
            await Post.decrement('nbre_likes',{ by: 1, where:{id: post_id}})
            await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=7'+postupdated)
            return res.status(200).json(postupdated)
        }else if(reponse.dislikes === 1 && postLikes === 0){
            await Post.decrement('nbre_dislikes',{ by: 1, where:{id: post_id}})
            await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
            // let postupdated = await Post.findOne({where:{ id: post_id}})
            let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
            console.log('consolelog=8'+postupdated)
            return res.status(200).json(postupdated)
        }



    }) .catch(error => res.status(400).json({error}));

 

        // await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
        //     .then(async ()=>{
        //        await Post_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, post_id: post_id})
        //             .then(() => res.status(200).json(Post_likes_dislikes))
                    
                    
        //             .catch(error => res.status(400).json({error}));
        //     })
        //     .catch(error => res.status(400).json({error}));
      
  

        // await Post_likes_dislikes.destroy({where:{ uuid: uuid, post_id: post_id}})
        //     .then(async()=>{
        //         await Post_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, post_id: post_id})
                
        //             .then(() => res.status(200).json(Post_likes_dislikes))
                    
        //             .catch(error => res.status(400).json({error}));
        //     })
            // .catch(error => res.status(400).json({error}));
    }
    exports.commentLikesDislikes = async (req, res)=>{
        let commentLikes = req.body.likes
        let uuid = req.body.uuid
        let comment_id = req.params.id
        let post_id = req.body.post_id
        await Comment_likes_dislikes.findOne({ where: {uuid: uuid, comment_id: comment_id, post_id: post_id} })
        
        .then( async reponse =>{
            //si find0ne ne trouve pas le post alors:
            if(!reponse && commentLikes === 1){
                await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id: post_id})
                // let postlikesupdated = await Post_likes_dislikes.findOne({where:{ uuid: uuid, post_id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=1'+postupdated)
                return res.status(200).json(postupdated)
    
            } if(!reponse && commentLikes === -1){
                await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
               
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id: post_id})
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=4'+postupdated)
                return res.status(200).json(postupdated)
    
            }else if(reponse.dislikes === 1 && commentLikes === 1){
                await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id: post_id})
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=2'+postupdated)
                return res.status(200).json(postupdated)
            }else if(reponse.likes === 1 && commentLikes === 1){
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=3'+postupdated)
                return res.status(200).json(postupdated)
            }else if(reponse.likes === 1 && commentLikes === -1){
                await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
                await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id: post_id})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                console.log('consolelog=5'+postupdated)
                return res.status(200).json(postupdated)
            }else if(reponse.dislikes === 1 && commentLikes === -1){
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=6'+postupdated)
                return res.status(200).json(postupdated)
            }else if(reponse.likes === 1 && commentLikes === 0){
                await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=7'+postupdated)
                return res.status(200).json(postupdated)
            }else if(reponse.dislikes === 1 && commentLikes === 0){
                await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
                await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id, post_id: post_id}})
                // let postupdated = await Post.findOne({where:{ id: post_id}})
                let postupdated = await Post.findOne({where:{ id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                console.log('consolelog=8'+postupdated)
                return res.status(200).json(postupdated)
            }
    
    
    
        }) .catch(error => res.status(400).json({error}));
    }



// exports.commentLikesDislikes = async (req, res)=>{
//     let commentLikes = req.body.likes
//     let uuid = req.body.uuid
//     let comment_id = req.params.id

  
//     if(commentLikes === 1){
//         await Comment_likes_dislikes.findOne({ where: {uuid: uuid, comment_id: comment_id} })
//         .then(async(response) => {
//             console.log(response)
//             if(response == null){
//                 await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
//             }else if(response.dislikes === 1){
//                 await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
//                 await Comment.increment('nbre_likes',{ by: 1, where:{id: comment_id}})
//             }else if(response.likes === 1){
//                 await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
//             }

//         }).catch(error => res.status(400).json({error}));
//         await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
//             .then(async ()=>{
//                 let comment = await Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
//                 let post_id = comment.post_id
//                 await Comment_likes_dislikes.create({ likes: req.body.likes,uuid: uuid, comment_id: comment_id, post_id:post_id})
//                     .then(() => res.status(200).json(Comment_likes_dislikes))
//                     .catch(error => res.status(400).json({error}));
//             })
//             .catch(error => res.status(400).json({error}));
//       }
  
//     else if(commentLikes === -1){
//         await Comment_likes_dislikes.findOne({ where: {uuid: uuid, comment_id: comment_id} })
//         .then(async(response) => {
//             console.log(response)
//             if(response == null){
//                 await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
//             }else if(response.likes === 1){
//                 await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
//                 await Comment.increment('nbre_dislikes',{ by: 1, where:{id: comment_id}})
//             }else if(response.dislikes === 1){
//                 await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
//             }

//         }).catch(error => res.status(400).json({error}));
//         await Comment_likes_dislikes.destroy({where:{ uuid: uuid, comment_id: comment_id}})
//             .then(async()=>{
//                 let comment = await Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
//                 let post_id = comment.post_id
//                 await Comment_likes_dislikes.create({ dislikes: -(req.body.likes),uuid: uuid, comment_id: comment_id, post_id:post_id})
//                     .then(() => res.status(200).json(Comment_likes_dislikes))
//                     .catch(error => res.status(400).json({error}));
//             })
//             .catch(error => res.status(400).json({error}));
//     }
//     else{       
//         await Comment_likes_dislikes.findOne({ where: {uuid: uuid, comment_id: comment_id} })
//     .then(async(response) => {
//         if(response.likes === 1){
//             await Comment.decrement('nbre_likes',{ by: 1, where:{id: comment_id}})
//         }if(response.dislikes === 1){
//             await Comment.decrement('nbre_dislikes',{ by: 1, where:{id: comment_id}})
//         }

//     })
//         await Comment_likes_dislikes.findAll({where : {uuid: uuid, comment_id: comment_id}})
//             .then(likesDislikesdelete =>{
//                 let comment = Comment.findOne({where: {id: comment_id}}) //Comment id pour rajouter lepost_id pour le delete all concernant le postID => delete tout concernant ce postID
//                 let post_id = comment.post_id
//                 if(!likesDislikesdelete){
//                     return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
//                 }
//                 Comment_likes_dislikes.destroy({where:{ uuid: uuid,comment_id: comment_id }||{uuid: uuid,post_id: post_id} })
//                 .then(()=> res.status(200).json(Comment_likes_dislikes))
//             })
//             .catch(err=> res.status(500).json({message: err.message}))

//     }
// }

exports.getCommentLikesDislikes = async (req, res)=>{
    try{
        let commentLikesDislikes = await Comment_likes_dislikes.findAll({where: {active: true}})
        return res.json(commentLikesDislikes)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }

}
exports.getPostLikesDislikes = async (req, res)=>{
    try{
        let postLikesDislikes = await Post_likes_dislikes.findAll({where: {active: true}})
        return res.json(postLikesDislikes)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
    
}
