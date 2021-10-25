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

//  exports.modifPost = (async (req,res) => {
 
//     try { 
        
//         return res.json() // renvoit la réponse
//     }catch(err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })
// exports.deletePost = (async (req,res) => {
 
//     try { 
        
//         return res.json() // renvoit la réponse
//     }catch(err) {
//         console.log(err)
//         return res.status(500).json(err)
//     }
// })