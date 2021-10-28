let { Comment } = require('../models')
let fs = require('fs'); //Systeme Filesystem de node.JS

exports.createComment = async (req,res) => {
    let {user_id, content, post_id} = req.body
     try {
        let comment = await Comment.create({content: content, user_id: user_id, post_id: post_id})
         return res.json(comment) // renvoit la réponse
     }catch(err) {
         console.log(err)
         return res.status(500).json(err)
     }
 };

 exports.getComment = async (req, res) => {
    let comment_id = req.params.id;
    try{
        let commentview = await Comment.findOne({ 
            where: { id: comment_id}, include:['post'] //include comment pour avoir le post + les commentaires liés => voir alias as:'post' dans models
        })//sans uui + email dans la requete => requete rejetée
            if(!commentview){
                return res.status(401).json({error: 'Post non trouvé!'})
            }
        return res.json(commentview)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
};

 exports.updateComment = async (req, res) => {
    // let user_id = req.params.user_id;
    // console.log(user_id)
    let comment_id = req.params.id;
    console.log(req.params)
    await Comment.findOne({where:{id: comment_id}})
    .then(async commentUpdated =>{
        if(!commentUpdated){
            return res.status(401).json({error: "Vous n'êtes pas autorisé à faire cette modification!!"})
        }
        let filename = commentUpdated.upload_url;
        if (fs.existsSync(filename)&&req.file == null) { //si imageurl est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur imageurl a null dans mysql
            fs.unlinkSync(filename)
            await Comment.update({ content: req.body.content, upload_url:null}, {where:{id: comment_id}})
            return res.status(200).json({message:'Commentaire mis à jour'})
          //file exists
        } if(fs.existsSync(filename)&&req.file !== null) { //si imageurl est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans imageurl de mysql (via req.file.path)
            fs.unlinkSync(filename)
            await Comment.update({ content: req.body.content, upload_url:req.file.path}, {where: {id: comment_id}})
            return res.status(200).json({message:'Commentaire mis à jour'})
        }
        if(req.file == null) { //si le fichier de requete est null ou undefined alors on renseigne null dans imageurl mysql
            await Comment.update({ content: req.body.content, upload_url:null}, {where:{id: comment_id}})
            return res.status(200).json({message:'Commentaire mis à jour'})
        }
        else{ //si le fichier de requete est présent et que imageurl est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
            await Comment.update({ content: req.body.content, upload_url:req.file.path}, {where:{ id: comment_id}})
            return res.status(200).json({message:'Commentaire mis à jour'})
        }
    })
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
            let filename = commentDelete.upload_url; //delete l'image du commentaire user
            fs.unlinkSync(filename)//delete l'image du commentaire user

            Comment.destroy({where:{ user_id: user_id, id: comment_id}})
            .then(()=> res.status(200).json({message :"Votre commentaire a bien été éffacé!"}))
        })
        .catch(err=> res.status(500).json({message: err.message}))
};