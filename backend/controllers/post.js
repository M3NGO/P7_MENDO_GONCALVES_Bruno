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
    try{
        let user = await User.findOne({where: {uuid: uuid}})
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        if (req.file == null) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
            await Post.create({ content: content, uuid: uuid,upload_url:null})
            return res.status(200).json({message:'Post créé!!!'})
          //file exists
        }else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            await Post.create({ content: content, uuid: uuid, upload_url:req.file.path})
            return res.status(200).json({message:'Post créé!!!'})
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
            return res.status(200).json({message:'Le contenu de votre post a été mis a jour'})
          //file exists
        }
        //si upload_url de l'objet trouvé à une url enregistrée &&  requete fichier envoyée par l'utilisateur alors:
        if(fs.existsSync(filename)&&req.file !== null) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
            fs.unlinkSync(filename)
            await Post.update({ content: req.body.content, upload_url:req.file.path}, {where: {uuid, id: post_id}})
            return res.status(200).json({message:'La photo/vidéo de votre post a bien été mise à jour'})
        }
        //si dans la requete body le content est vide && pas de fichier requete alors:
        if(req.body.content == ''&&req.file == null){ // pour effacer les post avec du content vide et pas d'images lors d'une mise a jour
            await Post.destroy({where:{uuid, id: post_id}})
            return res.status(200).json({error: "Votre mise a jour ne peut pas être vide, votre post a été éffacé"})
        }
        //si dans la requete body content n'est pas vide && pas de fichier requete alors:
        if(req.body.content !== ''&& req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
            await Post.update({ content: req.body.content, upload_url:null}, {where:{uuid, id: post_id}})
            return res.status(200).json({message:'Post mis à jour'})
        }       
        // si la requete body content && fichier requete alors :
        else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            await Post.update({ content: req.body.content, upload_url:req.file.path}, {where:{uuid, id: post_id}})
            return res.status(200).json({message:'Votre post a été mis à jour'})
        }
    }
    })
    .catch(error => res.status(400).json({error}));
};

exports.deletePost = async(req, res) =>{
    let uuid = req.body.uuid;
    let post_id = req.params.id;
    await Post.findOne({ where: {uuid, id: post_id} })
        .then(async userdelete =>{
            if(!userdelete){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }if(userdelete){
                let filename = userdelete.upload_url; //delete l'image avatar du user
                if(fs.existsSync(!filename)){
                   await Post.destroy({ where: {uuid, id: post_id} })
                    return res.status(200).json({message: 'Le post a été éffacé'})
                }if(fs.existsSync(filename)){
                    fs.unlinkSync(filename)//delete l'image avatar du user
                    await Post.destroy({ where: {uuid, id: post_id}})
                    return res.status(200).json({message: 'Le post a été éffacé'})
                }
                await Post.destroy({ where: {uuid, id: post_id} })
                return res.status(200).json({message: 'Le post a été éffacé'})
            }

        })
        .catch(err=> res.status(500).json({message: err.message}))
};
