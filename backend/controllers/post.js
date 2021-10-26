let { sequelize, User, Post } = require('../models')

exports.getallPosts = async (req,res) => {
    try{
        let posts = await Post.findAll()
        return res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}

exports.createPost = (async (req,res) => {
    let {user_id, content } = req.body
     try {
        let user = await User.findOne({where: {uuid: user_id}})
        let post = await Post.create({content: content, user_id: user.id})
         return res.json(post) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 })

 exports.updatePost = async (req, res, next) => {
    let user_id = req.body.user_id;
    let post_id = req.params.id;
    let postUpdated = await Post.findOne({where:{ user_id: user_id, id: post_id}})
        if(!postUpdated){
            return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
        }
        //a revoir
       await Post.update({ content: req.body.content, upload_url: req.body.upload_url}, {where:{ user_id: user_id, id:post_id}})
            .then(() => res.status(200).json({message: 'Votre post est modifié!!!'}))
            .catch(error => res.status(400).json({error}));
};
exports.deletePost = async(req, res) =>{
    let user_id = req.body.user_id;
    let post_id = req.params.id;
    Post.findOne({where:{ user_id: user_id, id: post_id}})
        .then(postDelete =>{
            if(!postDelete){
                return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
            }
            //penser a rajouter ici unlink les images des Posts
            Post.destroy({where:{ user_id: user_id, id: post_id}})
            .then(()=> res.status(200).json({message :"Votre message a bien été éffacé!"}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};