let { User, Post, Post_likes_dislikes } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.getallPosts = async (req,res) => {
    try{
        let posts = await Post.findAll({include:['comment']}) //let posts = await Post.findAll({include:[{model:User, as:'user'}]}) + ajouter alias  as 'user' dans model user section associations, si on veut retourner l'objet Post et User qui a créé le post en une seule requete
        return res.json(posts)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}

exports.getPost = async (req, res) => {
    let postid = req.params.id;
    try{
        let postview = await Post.findOne({ 
            where: { id: postid}, include:['comment'] //include comment pour avoir le post + les commentaires
        })//sans uui + email dans la requete => requete rejetée
            if(!postview){
                return res.status(401).json({error: 'Post non trouvé!'})
            }
        return res.json(postview)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}

exports.createPost = async (req,res) => {
    let {uuid, content } = req.body
     try {
        let user = await User.findOne({where: {uuid: uuid}})
        let post = await Post.create({content: content, user_id: user.id})
         return res.json(post) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 }

 exports.updatePost = async (req, res, next) => {
    let post_id = req.params.id;
    await Post.findOne({where:{ id: post_id}})
    .then( async postUpdated =>{

        if(!postUpdated){
            return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
        }
        let filename = postUpdated.upload_url;
        if (fs.existsSync(filename)&&req.file == null) { //si imageurl est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur imageurl a null dans mysql
            fs.unlinkSync(filename)
            await Post.update({ content: req.body.content, upload_url:null}, {where:{ id: post_id}})
            return res.status(200).json({message:'Post mis à jour'})
          //file exists
        } if(fs.existsSync(filename)&&req.file !== null) { //si imageurl est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans imageurl de mysql (via req.file.path)
            fs.unlinkSync(filename)
            await Post.update({ content: req.body.content, upload_url:req.file.path}, {where: {id: post_id}})
            return res.status(200).json({message:'Post mis à jour'})
        }
        if(req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans imageurl mysql
            await Post.update({ content: req.body.content, upload_url:null}, {where:{id: post_id}})
            return res.status(200).json({message:'Post mis à jour'})
        }
        else{ //si le fichier de requete est présent et que imageurl est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            await Post.update({ content: req.body.content, upload_url:req.file.path}, {where:{id: post_id}})
            return res.status(200).json({message:'Post mis à jour'})
        }
    })
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
            let filename = postDelete.upload_url; //delete l'image avatar du user
            fs.unlinkSync(filename)//delete l'image avatar du user
        
            Post.destroy({where:{ user_id: user_id, id: post_id}})
            .then(()=> res.status(200).json({message :"Votre message a bien été éffacé!"}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};

exports.postLikesDislikes = async (req, res)=>{
    let postLikes = req.body.likes
    let user_id = req.body.user_id
    let post_id = req.params.id
  
    if(postLikes === 1){
        await Post_likes_dislikes.destroy({where:{ user_id: user_id, post_id: post_id}})
            .then(async ()=>{
                await Post_likes_dislikes.create({ likes: req.body.likes,user_id: user_id, post_id: post_id})
                    .then(() => res.status(200).json({message: 'Hmmm je Like!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
      }
  
    else if(postLikes === -1){
        await Post_likes_dislikes.destroy({where:{ user_id: user_id, post_id: post_id}})
            .then(async()=>{
                await Post_likes_dislikes.create({ dislikes: -(req.body.likes),user_id: user_id, post_id: post_id})
                    .then(() => res.status(200).json({message: 'Beurk je Dislike!'}))
                    .catch(error => res.status(400).json({error}));
            })
            .catch(error => res.status(400).json({error}));
    }
    else{
        await Post_likes_dislikes.findAll({where : {user_id: user_id, post_id: post_id}})
            .then(likesDislikesdelete =>{
                if(!likesDislikesdelete){
                    return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette suppression!!"})
                }
                Post_likes_dislikes.destroy({where:{ user_id: user_id, post_id: post_id}})
                .then(()=> res.status(200).json({message :"Vos likes/dislikes ont bien été éffacés!"}))
            })
            .catch(err=> res.status(500).json({message: err.message}))

    }
}