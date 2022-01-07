let { User, Post, Comment, Post_likes_dislikes, Comment_likes_dislikes } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.getallPosts = async (req,res) => {
    try{
        let posts = await Post.findAll({where: {active: true}, order: [['createdAt', 'DESC']], include:['comment', 'postlikes', 'commentlikes']}) //let posts = await Post.findAll({include:[{model:User, as:'user'}]}) + ajouter alias  as 'user' dans model user section associations, si on veut retourner l'objet Post et User qui a créé le post en une seule requete
        return res.json(posts)
    }catch(err){
        // console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getallPosts

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
        // console.log(err)
        return res.status(500).json({message: err.message})
    }
}//FIN EXPORT getPost

exports.createPost = async (req,res) => {
    let {uuid, content, email } = req.body
    try{
        let user = await User.findOne({where: {uuid: uuid, active: true}})
        if(!user){
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
        }
        //Si pas de fichier dans la requete alors:
        if (req.file == null) { 
            //on créé le post en BDD
            await Post.create({ content: content, uuid: uuid, avatar: user.upload_url ,email:email, upload_url:null})
            //on trouve le user qui a créé le post
            let nbrePosts = await User.findOne({ where: {uuid} })
            //on incrémente le nombre de posts du user qui a créé le post
            await User.update({ nbre_posts: nbrePosts.nbre_posts +1},{ where: {uuid} })
            //on retrouve la liste de tous les posts et on l'envoie au front
            let postupdated = await Post.findAll({where:{active: true}, include:['comment', 'postlikes', 'commentlikes']})
            return res.status(200).json(postupdated)
        }
        //Si fichier présent dans la requete alors :
        else{
            //on créé le post en BDD
            await Post.create({ content: content, uuid: uuid, avatar: user.upload_url, email:email, upload_url:req.file.path})
            //on trouve le user qui a créé le post
            let nbrePosts = await User.findOne({ where: {uuid} })
            //on incrémente le nombre de posts du user qui a créé le post
            await User.update({ nbre_posts: nbrePosts.nbre_posts +1},{ where: {uuid} })
            //on retrouve la liste de tous les posts et on l'envoie au front
            let postupdated = await Post.findAll({where:{active: true}, include:['comment', 'postlikes', 'commentlikes']})
            return res.status(200).json(postupdated)
        }
    }catch(err) {
    // console.log(err)
    return res.status(500).json(err)
    }
};//FIN EXPORT createPost

exports.updatePost = async (req, res) => {
    let uuid = req.body.uuid;
    let post_id = req.params.id;
    let user = await User.findOne({where: {uuid: uuid, active: true}})
    await Post.findOne({where:{ uuid, id: post_id}})
        .then( async postUpdated =>{
            // console.log(postUpdated)
            //si find0ne ne trouve pas le post alors:
            if(!postUpdated){
                return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
            }
            //si findOne trouve le post à updater:
            if(postUpdated){
            //On assigne l'url fichier a la variable filename
            let filename = postUpdated.upload_url;
            //Si l'url fichier existe et le fichier est enregistré dans uploads alors et que la requete contient un fichier alors :
            if (fs.existsSync(filename)&&req.file == null ) {
                //on trouve le post et on l'update avec le nouveau contenu et on garde l'url initiale du fichier (update uniquement le contenu du post pas l'image)
                await Post.update({ content: req.body.content, avatar: user.upload_url}, {where:{uuid, id: post_id}})
                //on trouve le post updaté et on l'envoit au front
                let postupdated = await Post.findOne({where:{uuid, id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si upload_url de l'objet trouvé à une url enregistrée && requete fichier envoyée par l'utilisateur alors:
            if(fs.existsSync(filename)&&req.file !== null) {
                //on efface le fichier précédent du back updload
                fs.unlinkSync(filename)
                //On update le post avec le contenu envoyé du front
                await Post.update({ content: req.body.content, avatar: user.upload_url, upload_url:req.file.path}, {where: {uuid, id: post_id}})
                //On trouve le post et on l'envoit au front
                let postupdated = await Post.findOne({where:{uuid, id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si dans la requete body le content est vide && pas de fichier requete alors:
            if(req.body.content == ''&&req.file == null){ // pour effacer les post avec du content vide et pas d'images lors d'une mise a jour
                //on retrouve simplement le post et on le renvoit sans modifications puisque la demande d'update est vide
                let postupdated = await Post.findOne({where:{uuid, id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
            //si dans la requete body content n'est pas vide && pas de fichier requete alors:
            if(req.body.content !== ''&& req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
                await Post.update({ content: req.body.content, avatar: user.upload_url, upload_url:null}, {where:{uuid, id: post_id}})
                let postupdated = await Post.findOne({where:{uuid, id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }       
            // tous les autres cas :
            else{
                //on update le post avec le content provenant du front
                await Post.update({ content: req.body.content, avatar: user.upload_url, upload_url:req.file.path}, {where:{uuid, id: post_id}})
                let postupdated = await Post.findOne({where:{uuid, id: post_id}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(postupdated)
            }
        }//FIN THEN
        })
        .catch(error => res.status(400).json({error}));
};//FIN EXPORT updatePost

exports.deletePost = async(req, res) =>{
    let post_id = req.params.id;
    let uuid = await Post.findOne({where:{id: post_id}})
    try{
        //on trouve le post a delete
        await Post.findOne({ where: { id: post_id} })
            .then(async postdelete =>{
                //si le post n'est pas trouvé alors :
                if(!postdelete){
                    return res.status(401).json({error: 'post non trouvé!'})
                }
                //Si le post est trouvé alors :
                if(postdelete){
                    //On assigne l'upload_url au filename
                    let filename = postdelete.upload_url;
                    //Si le post n'a pas d'url image alors :
                    if(fs.existsSync(!filename)){
                        //On trouve le user qui a créé le post
                        let nbrePosts = await User.findOne({ where: {uuid:uuid.uuid} })
                        //On décrémente le nombre de posts au user de 1
                        await User.update({ nbre_posts: nbrePosts.nbre_posts -1},{ where: {uuid:uuid.uuid} })
                        //on trouve les commentaires liés au post
                        let CommentToDelete = await Post.findOne({ where: {id: post_id}})
                        //Si le nombre de commentaires dans la colone de la table post pour le post en question est différent de 0 alors:
                        if(CommentToDelete.nbre_comments !=0){
                            //on update le user colonne nbre_comments en prenant la valeur de la case et en lui retirant le nombre de commentaires du post qui sera delete
                            await User.update({ nbre_comments: nbrePosts.nbre_comments-CommentToDelete.nbre_comments },{ where: {uuid:uuid.uuid} })
                        }
                        //on trouve les post likes dislikes et on les efface
                        await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                    //ON trouve le post et on l'efface de mysql
                    await Post.destroy({ where: { id: post_id} })
                    }
                    //Si le post détient une image avec url alors
                    else if(fs.existsSync(filename)){
                        //on efface le fichier du back dossier uploads
                        fs.unlinkSync(filename, async (err)=>{
                            //delete l'image avatar du user
                            if (err) console.log(err); console.log('Fichier du Post a été effacé du back')
                            })//FIN - delete l'image avatar du user
                            
                        //on trouve le user du post et on décrémente de 1 dans la colonne nbre_posts :
                        let nbrePosts = await User.findOne({ where: {uuid:uuid.uuid} })
                        await User.update({ nbre_posts: nbrePosts.nbre_posts -1},{ where: {uuid:uuid.uuid} })
                        //On trouve le post pour les commentaires:
                        let CommentToDelete = await Post.findOne({ where: {id: post_id}})
                            //Si le post est trouvé on update le user colonne nbre_comments, on prend la valeur initiale et on soustrait la valeur qui est dans la table posts
                            if(CommentToDelete){
                                await User.update({ nbre_comments: nbrePosts.nbre_comments-CommentToDelete.nbre_comments },{ where: {uuid:uuid.uuid} })
                            }
                        //On efface les likes/dislikes du post:
                        await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                        //on efface le post de mysql
                        await Post.destroy({ where: { id: post_id}})
                    }
                    // les autres cas:
                    else{
                        //On trouve le user pour le nbrePosts
                        let nbrePosts = await User.findOne({ where: {uuid:uuid.uuid} })
                        //on décrémente les nombre de posts du user de 1
                        await User.update({ nbre_posts: nbrePosts.nbre_posts -1},{ where: {uuid:uuid.uuid} })
                        //on trouve les commentaires liés au post pour delete
                        let CommentToDelete = await Post.findOne({ where: {id: post_id}})
                            if(CommentToDelete){
                                await User.update({ nbre_comments: nbrePosts.nbre_comments-CommentToDelete.nbre_comments },{ where: {uuid:uuid.uuid} })
                            } 
                    
                    }
                    //On efface les post likes/dislikes
                    await Post_likes_dislikes.destroy({ where: {post_id: post_id}})
                    //on efface le post de la BDD
                    await Post.destroy({ where: { id: post_id} })
                }//FIN IF POSTDELETE
            })//FIN THEN
        //on trouve tous les posts actifs et on les envoit au front
        let posts = await Post.findAll({where: {active: true}, include:['comment', 'postlikes', 'commentlikes']})
        return res.status(200).json(posts)

        }catch(err){
            console.log(err)
            return res.status(500).json({message: err.message})
        }
};//FIN EXPORT deletePost
