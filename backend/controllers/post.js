let { User, Post, Comment, Post_likes_dislikes, Comment_likes_dislikes } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.getallPosts = async (req,res) => {
    try{
        let posts = await Post.findAll({where: {active: true}, include:['comment', 'postlikes', 'commentlikes']}) //let posts = await Post.findAll({include:[{model:User, as:'user'}]}) + ajouter alias  as 'user' dans model user section associations, si on veut retourner l'objet Post et User qui a créé le post en une seule requete
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
            where: { id: postid, active: true}, include:['comment', 'postlikes', 'commentlikes'] //include comment pour avoir le post + les commentaires
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
    let {uuid, content, email } = req.body
    try{
        let user = await User.findOne({where: {uuid: uuid, active: true}})
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        if (req.file == null) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
            let newpost = await Post.create({ content: content, uuid: uuid, email:email, upload_url:null})
            return res.status(200).json(newpost)
          //file exists
        }else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            let newpost = await Post.create({ content: content, uuid: uuid, email:email, upload_url:req.file.path})
            return res.status(200).json(newpost)
        }
    }catch(err) {
    console.log(err)
    return res.status(500).json(err)
    }   
};

 exports.updatePost = async (req, res) => {
    let uuid = req.body.uuid;
    let post_id = req.params.id;
    await Post.findOne({where:{ uuid, id: post_id}})
    .then( async postUpdated =>{
        // console.log(postUpdated)
        //si find0ne ne trouve pas le post alors:
        if(!postUpdated){
            return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
        }
        if(postUpdated){
            //si findOne trouve le post:
            //si upload_url de l'objet trouvé à une url enregistrée && aucune requete fichier alors:
        let filename = postUpdated.upload_url;
        // console.log(req.file);
        if (fs.existsSync(filename)&&req.file == null ) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
            fs.unlinkSync(filename)
            await Post.update({ content: req.body.content, upload_url:null}, {where:{uuid, id: post_id}})
            return res.status(200).json(postUpdated)
          //file exists
        }
        //si upload_url de l'objet trouvé à une url enregistrée &&  requete fichier envoyée par l'utilisateur alors:
        if(fs.existsSync(filename)&&req.file !== null) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
            fs.unlinkSync(filename)
            let postupdated= await Post.update({ content: req.body.content, upload_url:req.file.path}, {where: {uuid, id: post_id}})
            return res.status(200).json(postUpdated)
        }
        //si dans la requete body le content est vide && pas de fichier requete alors:
        if(req.body.content == ''&&req.file == null){ // pour effacer les post avec du content vide et pas d'images lors d'une mise a jour
            await Post.destroy({where:{uuid, id: post_id}})
            return res.status(200).json({error: "Votre mise a jour ne peut pas être vide, votre post a été éffacé"})
        }
        //si dans la requete body content n'est pas vide && pas de fichier requete alors:
        if(req.body.content !== ''&& req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
            await Post.update({ content: req.body.content, upload_url:null}, {where:{uuid, id: post_id}})
            return res.status(200).json(postUpdated)
        }       
        // si la requete body content && fichier requete alors :
        else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            let postupdated = await Post.update({ content: req.body.content, upload_url:req.file.path}, {where:{uuid, id: post_id}})
            return res.status(200).json(postupdated)
        }
    }
    })
    .catch(error => res.status(400).json({error}));
};

exports.deletePost = async(req, res) =>{
    // let uuid = req.body.uuid;
    let post_id = req.params.id;
    try{
        // await Comment.findOne({ where: { post_id: post_id} })
        // .then(async userdelete =>{
        //     if(!userdelete){
        //         return res.status(401).json({error: 'Utilisateur non trouvé! commentaire'})
        //     }if(userdelete){
        //         let filename = userdelete.upload_url; //delete l'image avatar du user
        //         if(fs.existsSync(!filename)){
        //             await Comment_likes_dislikes.destroy({ where: {post_id: post_id}})
        //             await Comment.destroy({ where: {post_id: post_id} })
        //         }if(fs.existsSync(filename)){
        //             fs.unlinkSync(filename, async (err)=>{
        //                 if (err) console.log(err); console.log('Fichier du commentaire a été effacé du back')})//delete l'image avatar du user
        //                 await Comment_likes_dislikes.destroy({ where: {post_id: post_id}})
        //                 await Comment.destroy({ where: {post_id: post_id}})  
        //         }
        //         await Comment_likes_dislikes.destroy({ where: {post_id: post_id}})
        //         await Comment.destroy({ where: {post_id: post_id} })
        //     }
        // })

    await Post.findOne({ where: { id: post_id} })
        .then(async userdelete =>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé! post'})
            }if(userdelete){
                let filename = userdelete.upload_url; //delete l'image avatar du user
                if(fs.existsSync(!filename)){
                    await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                   await Post.destroy({ where: { id: post_id} })
                }if(fs.existsSync(filename)){
                    fs.unlinkSync(filename, async (err)=>{
                        if (err) console.log(err); console.log('Fichier du Post a été effacé du back')})//delete l'image avatar du user
                        await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                        await Post.destroy({ where: { id: post_id}})
                }
                await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                await Post.destroy({ where: { id: post_id} })
            }
        })



        return res.status(200).json({message: "Le post et ses commentaires ont été éffacés de Groupomania"})
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }

};
