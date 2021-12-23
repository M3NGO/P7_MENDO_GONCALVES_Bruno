let { User,Comment, Post } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.createComment = async (req,res) => {
    let {uuid, content, post_id, email} = req.body
     try {
         let post = await Post.findOne({ where: {id:post_id} })
         let user = await User.findOne({where: { uuid : post.uuid}})
         let avatar = await User.findOne({where: { uuid : uuid}})
         console.log(user)
         if(!user){
             return res.status(401).json({error: 'Utilisateur non trouvé'})
         }
         if(req.file == null){

            // let nbreCommentsPosts = await Post.findOne({ where: {id:post_id} })
            
            await Post.update({ nbre_comments: post.nbre_comments +1},{ where: {id:post_id} })
            // let nbreComments = await User.findOne({ where: {uuid:uuid} })
            // let uuidPost = await Post.findOne({ where: {id:post_id} })
            await User.update({ nbre_comments: user.nbre_comments +1},{ where: {uuid:user.uuid} })
            let comment = await Comment.create({content: content, uuid: uuid, avatar: avatar.upload_url, email:email, post_id: post_id, upload_url:null, active: true})
            let nbreCommentsPosts = await Post.findAll({where:{active: true}, include:['comment', 'postlikes', 'commentlikes']})
            return res.json(nbreCommentsPosts) // renvoit la réponse
         }else{
            // let nbreComments = await User.findOne({ where: {uuid:uuid} })
            await Post.update({ nbre_comments: post.nbre_comments +1},{ where: {id:post_id} })
            // let nbreCommentsPosts = await Post.findOne({ where: {id:post_id} })
            // let uuidPost = await Post.findOne({ where: {id:post_id} })
            await User.update({ nbre_comments: user.nbre_comments +1},{ where: {uuid:user.uuid} })
            let comment = await Comment.create({content: content, uuid: uuid, avatar: avatar.upload_url, email:email, post_id: post_id, upload_url:req.file.path, active: true})
            let nbreCommentsPosts = await Post.findAll({where:{active: true}, include:['comment', 'postlikes', 'commentlikes']})
            return res.json(nbreCommentsPosts) // renvoit la réponse
         }
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 };

 exports.getComment = async (req, res) => {
    let comment_id = req.params.id;
    try{
        let commentview = await Comment.findOne({ 
            where: { id: comment_id, active: true}, include:['post'] //include post pour avoir le post + les commentaires liés => voir alias as:'post' dans models
        })//sans uui + email dans la requete => requete rejetée
            if(!commentview){
                return res.status(401).json({error: 'Commentaire non trouvé!'})
            }
        return res.json(commentview)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
};

 exports.updateComment = async (req, res) => {
    // let uuid = req.params.uuid;
    // console.log(uuid)
    let uuid = req.body.uuid;
    let comment_id = req.params.id;
    let post_id = req.body.post_id
await Comment.findOne({where:{ id: comment_id}})
    
.then( async commentUpdated =>{
    //si find0ne ne trouve pas le post alors:
    if(!commentUpdated){
        return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
    }
    //si findOne trouve le comment:
        //si upload_url de l'objet trouvé à une url enregistrée && aucune requete fichier alors:
    let filename = commentUpdated.upload_url;
    let user = await User.findOne({where: { uuid : uuid, active: true}})
    if (fs.existsSync(filename)&&req.file == null) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
        // fs.unlinkSync(filename)
        await Comment.update({ content: req.body.content, avatar: user.upload_url}, {where:{ id: comment_id}})
        let commentupdated = await Post.findOne({where:{ id: post_id}})
        return res.status(200).json(commentupdated)
      //file exists
    }
    //si upload_url de l'objet trouvé à une url enregistrée &&  requete fichier envoyée par l'utilisateur alors:
    if(fs.existsSync(filename)&&req.file !== null) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
        fs.unlinkSync(filename)
        await Comment.update({ content: req.body.content, avatar: user.upload_url, upload_url:req.file.path}, {where: {id: comment_id}})
        let commentupdated = await Post.findOne({where:{ id: post_id}})
        return res.status(200).json(commentupdated)
    }
    //si dans la requete body le content est vide && pas de fichier requete alors:
    if(req.body.content == ''&&req.file == null){ // pour effacer les comment avec du content vide et pas d'images lors d'une mise a jour
        // await Comment.destroy({where:{id: comment_id}})
        return res.status(200).json(commentUpdated)
    }
    //si dans la requete body content n'est pas vide && pas de fichier requete alors:
    if(req.body.content !== ''&&req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
        await Comment.update({ content: req.body.content, avatar: user.upload_url, upload_url:null}, {where:{id: comment_id}})
        let commentupdated = await Post.findOne({where:{ id: post_id}})
        return res.status(200).json(commentupdated)
    }       
    // si la requete body content && fichier requete alors :
    else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
        await Comment.update({ content: req.body.content, avatar: user.upload_url, upload_url:req.file.path}, {where:{id: comment_id}})
        let commentupdated = await Post.findOne({where:{ id: post_id}})
        return res.status(200).json(commentupdated)
    }
})
.catch(error => res.status(400).json({error}));
};

exports.deleteComment = async(req, res) =>{
    // let uuid = req.body.uuid;
    let comment_id = req.params.id
    // let uuid = await Comment.findOne({where:{id: comment_id}})
    let comment = await Comment.findOne({where:{ id: comment_id}})
    let post = await Post.findOne({ where: {id: comment.post_id} })
    let user = await User.findOne({where: { uuid : post.uuid}})
    await Comment.findOne({ where: { id: comment_id} })
        .then(async commentDelete =>{
            if(!commentDelete){
                return res.status(401).json({error: 'Comment non trouvé!'})
            }if(commentDelete){
                let filename = commentDelete.upload_url; //delete l'image avatar du user
                if(fs.existsSync(!filename)){
                    // let nbreComments = await User.findOne({ where: {uuid:uuid.uuid} })
                    await User.update({ nbre_comments: user.nbre_comments -1},{ where: {uuid:user.uuid} })
                    // let nbreCommentsPosts = await Post.findOne({ where: {id:post_id.post_id} })
                    await Post.update({ nbre_comments: post.nbre_comments -1},{ where: {id: comment.post_id} })
                   await Comment.destroy({ where: { id: comment_id} })
                   let posts = await Post.findAll({where: {active: true}, include:['comment', 'postlikes', 'commentlikes']})
                    return res.status(200).json(posts)
                }else if(fs.existsSync(filename)){
                    fs.unlinkSync(filename)//delete l'image avatar du user
                    // let nbreComments = await User.findOne({ where: {uuid:uuid.uuid} })
                    await User.update({ nbre_comments: user.nbre_comments -1},{ where: {uuid:user.uuid} })
                    // let nbreCommentsPosts = await Post.findOne({ where: {id:post_id.post_id} })
                    await Post.update({ nbre_comments: post.nbre_comments -1},{ where: {id: comment.post_id} })
                    await Comment.destroy({ where: { id: comment_id}})
                    let posts = await Post.findAll({where: {active: true}, include:['comment', 'postlikes', 'commentlikes']})
                    return res.status(200).json(posts)
                }else{
                // let nbreComments = await User.findOne({ where: {uuid:uuid.uuid} })
                await User.update({ nbre_comments: user.nbre_comments -1},{ where: {uuid:user.uuid} })
                // let nbreCommentsPosts = await Post.findOne({ where: {id:post_id.post_id} })
                await Post.update({ nbre_comments: post.nbre_comments -1},{ where: {id: comment.post_id} })
                await Comment.destroy({ where: { id: comment_id} })
                let posts = await Post.findAll({where: {active: true}, include:['comment', 'postlikes', 'commentlikes']})
                return res.status(200).json(posts)
                }
            }

        })
        .catch(err=> res.status(500).json({message: err.message}))
};