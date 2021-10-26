let { sequelize,User, Post, Comment } = require('../models')
 
exports.createComment = async (req,res) => {
    let {user_id, content, post_id} = req.body
     try {
        let comment = await Comment.create({content: content, user_id: user_id, post_id: post_id})
         return res.json(comment) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 }
 exports.updateComment = async (req, res) => {
    let user_id = req.body.user_id;
    let post_id = req.body.post_id;
    let comment_id = req.body.comment_id;
    let commentUpdated = await Comment.findOne({where:{ user_id: user_id, post_id: post_id, id: comment_id}})
        if(!commentUpdated){
            return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
        }
        //a revoir
       await Comment.update({ content: req.body.content, upload_url: req.body.upload_url}, {where:{ user_id: user_id, id:comment_id}})
            .then(() => res.status(200).json({message: 'Votre commentaire est modifié!!!'}))
            .catch(error => res.status(400).json({error}));
};
exports.deleteComment = async(req, res) =>{
    let user_id = req.body.user_id;
    let comment_id = req.body.comment_id
    Comment.findOne({where:{ user_id: user_id, id: comment_id}})
        .then(commentDelete =>{
            if(!commentDelete){
                return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
            }
            //penser a rajouter ici unlink les images des Posts
            Comment.destroy({where:{ user_id: user_id, id: comment_id}})
            .then(()=> res.status(200).json({message :"Votre commentaire a bien été éffacé!"}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};