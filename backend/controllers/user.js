let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { Comment, Post, User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS

// get un seul user pour le profil
exports.profile = async(req,res)=>{
    let uuid = req.params.uuid;
    // let lastname = req.params.lastname;
    // let email = req.body.email;
    try{
        let userProfile = await User.findOne({ 
            where: {uuid}, // on oblige le front a envoyer uuid + email du user dans la requete
            include:['post', 'comment', 'postlikes','commentlikes'], //on récupère tous les post, comment, likes du user via les alias mis dans models
        })//sans uui + email dans la requete => requete rejetée
            if(!userProfile){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
        return res.json(userProfile)
    }catch(err){
        console.log(err)
        return res.status(500).json({message: err.message})
    }
}
//FIN - get un seul user pour le profil

//Update d'un user
exports.update = async (req, res, next) => {
    let uuid = req.params.uuid;
    await User.findOne({where:{ uuid : uuid}}) //find et delete ancienne image
    .then( async userUpdated => {
        // console.log(req.file) // pour voir la requete fichier
        if(!userUpdated){
        
            return res.status(401).json({error: 'Utilisateur non trouvé!'})
            
    }if(userUpdated){
    let filename = userUpdated.upload_url;
    //block gestion des upload avatar :

            if (fs.existsSync(filename)&&!req.file) { //si upload_url est présent pour le uuid dans mysql ET pas de fichier dans la requete, alors on efface le fichier et on met la valeur upload_url a null dans mysql
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname, email:req.body.email,upload_url:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
              //file exists
            } if(fs.existsSync(filename)) { //si upload_url est rempli dans mysql alors on efface le fichier et on renseigne le nouveau link vers le fichier uploadé dans upload_url de mysql (via req.file.path)
                fs.unlinkSync(filename)
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, upload_url:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            if(!req.file) { //si le fichier de requete est null ou undefined alors on renseigne null dans upload_url mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, upload_url:null}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
            else{ //si le fichier de requete est présent et que upload_url est vide dans mysql alors on extrait le path du fichier requete et on l'enregistre dans mysql
                await User.update({ firstname: req.body.firstname, lastname:req.body.lastname,email:req.body.email, upload_url:req.file.path}, {where:{ uuid : uuid}})
                return res.status(200).json({message:'Utilisateur mis à jour'})
            }
        }
    })//else
        .catch(error => res.status(400).json({error}));
    };
//FIN - Update d'un user


exports.updatePassword = async (req, res)=>{
    let uuid = req.params.uuid;
    User.findOne({ where: {uuid} })
        .then(async userUpdate =>{
            if(!userUpdate){
                return res.status(401).json({error: 'Utilisateur non trouvé!'})
            }
            //verif si password null
            let passwordUpdate = req.body.password;
            if(!passwordUpdate) { // si passwordUpdate est null alors on fait rien
                return res.status(401).json({error: 'le mot de passe ne peut être vide'})
            //FIN - verif si password null
            }else{
                let hash =  await bcrypt.hash(passwordUpdate, 14 )
                await User.update({ password:hash},{ where: {uuid} })
                return res.status(200).json({message:'Mot de passe mis à jour'})
            }
        })//then
        .catch(err=> res.status(500).json({message: err.message}))
}

exports.delete = async (req, res)=>{
let uuid = req.params.uuid
try{
    await Comment.findAll({ where: {uuid} })
    .then(async commentdelete =>{
        await commentdelete.forEach(async element =>{
            await Post.findOne({ where: {uuid} })
                if(!element){
                    return res.status(401).json({error: 'Commentaire non trouvé'})
                }if(element){
                    let filename = element.upload_url; //delete l'image du commentaire
                    if(fs.existsSync(!filename)){
                        await Comment.destroy({ where: {uuid,}})
                        return res.status(200).json({message: 'Le commentaire a été éffacé'})
                    }if(fs.existsSync(filename)){
                        fs.unlink(filename, (err)=>{
                                        if (err) throw err; console.log('Fichier du commentaire a été effacé du back')})
                        return res.status(200).json({message: 'Le commentaire a été éffacé'})
                        // .catch(err=> res.status(500).json({message: err.message}))  
                    
                    }
                    
                    return res.status(200).json({message: 'Le commentaire a été éffacé'})
                    // .catch(err=> res.status(500).json({message: err.message}))
                }
                return res.status(200).json({message: 'Le commentaire a été éffacé'})
                // .catch(err=> res.status(500).json({message: err.message}))
            })
            await Comment.destroy({ where: {uuid,}})
            // .catch(err=> res.status(500).json({message: err.message}))
        }) //FIN THEN Comment 


    await Post.findAll({ where: {uuid} })
    .then(async userdelete =>{
        await userdelete.forEach(async element =>{
            await Post.findOne({ where: {uuid} })
                if(!element){
                    return res.status(401).json({error: 'Post non trouvé!'})
                }if(element){
                    let filename = element.upload_url; //delete l'image du post
                    if(fs.existsSync(!filename)){
                        await Post.destroy({ where: {uuid,} })
                        return res.status(200).json({message: 'Le post a été éffacé'})
                    }if(fs.existsSync(filename)){
                        fs.unlink(filename, (err)=>{
                                        if (err) throw err; console.log('Fichier Post effacé du back')})
                        return res.status(200).json({message: 'Le post a été éffacé'})
                        // .catch(err=> res.status(500).json({message: err.message}))  
                    
                    }
                    
                    return res.status(200).json({message: 'Le post a été éffacé'})
                    // .catch(err=> res.status(500).json({message: err.message}))
                }
                return res.status(200).json({message: 'Le post a été éffacé'})
                // .catch(err=> res.status(500).json({message: err.message}))
            })
            await Post.destroy({ where: {uuid,} })
            // .catch(err=> res.status(500).json({message: err.message}))
        }) //FIN THEN POST


        await User.findOne({ where: {uuid} })
        .then(async userdelete =>{
            await User.findOne({ where: {uuid} })
                if(!userdelete){
                    return res.status(401).json({error: 'Utilisateur non trouvé!'})
                }if(userdelete){
                    let filename = userdelete.upload_url; //delete l'image avatar du user
                    if(fs.existsSync(!filename)){
                        await User.destroy({ where: {uuid:uuid} })
                        return res.status(200).json({message: "L'utilisateur a été éffacé"})
                    }if(fs.existsSync(filename)){
                        fs.unlink(filename, (err)=>{
                            if (err) throw err; console.log("l'avatar a été éffacé du back")})
                            await User.destroy({ where: {uuid:uuid} })
                        return res.status(200).json({message: "L'utilisateur a été éffacé"})
                        // .catch(err=> res.status(500).json({message: err.message})) 
                       } // fin if fsexists
                }//fin if userdelete
        })// FIN then User
        .catch(err=> res.status(500).json({message: err.message}))

        // await Post.destroy({ where: {uuid,} })
        // await Comment.destroy({ where: {uuid,}})
        // await User.destroy({ where: {uuid:uuid} })
        .then(()=> res.status(200).json({message :'Le profil utilisateur ainsi que tout son contenu a été éffacé!'}))
       } //fin try post

    catch(err) {
    console.log(err)
    return res.status(500).json(err)
    }   
        // return res.status(500).json({message: err.message})
};


