let jwt = require('jsonwebtoken')
let bcrypt = require('bcrypt')
let { User } = require('../models') // on invoque sequelizer et model User pour qu'ils aient besoin de ./models
let fs = require('fs'); //Systeme Filesystem de node.JS

//signup/Creation des new users
exports.signup = async (req,res) => {
    // verif si password null dans la req
    let passwordSignup = req.body.password;
    let emailSignup = req.body.email;
    if(!passwordSignup || !emailSignup) { // si passwordUpdate est null alors on fait rien
        return res.status(401).json({error: "le mot de passe et l'email doivent être renseignés."})
    //FIN -  verif si password null dans la req
    }else{
        let hash =  await bcrypt.hash(passwordSignup, 14 )
        try { 
            let user = await User.create({ 
                email:req.body.email, 
                password:hash,
                }) //{email, password} objet json envoyé dans body request
                fs.mkdirSync('../uploads/'+req.body.email)
                fs.mkdirSync('../uploads/'+req.body.email +'/avatar')
                fs.mkdirSync('../uploads/'+req.body.email +'/images')
                fs.mkdirSync('../uploads/'+req.body.email + '/images/posts')
                fs.mkdirSync('../uploads/'+req.body.email + '/images/comments')
                fs.mkdirSync('../uploads/'+req.body.email +'/videos')
                fs.mkdirSync('../uploads/'+req.body.email + '/videos/posts')
                fs.mkdirSync('../uploads/'+req.body.email + '/videos/comments')
            return res.json(user) // renvoit la réponse
        }catch(err) {
            console.log(err)
            return res.status(500).json(err)
        }//fin catch
    }//fin else
 };//fin fonction signup
//FIN - signup/Creation des new users

// LOGIN des users
exports.login = (req, res, next) => {
    User.findOne({where:{email: req.body.email}})
    .then(user => {
        if(!user){
            return res.status(401).json({error :'Utilisateur non trouvé!'});
        }
        bcrypt.compare(req.body.password, user.password)
            .then(valid => {
                if(!valid){
                    return res.status(401).json({error :'Mot de passe incorrect! '});
                }
                res.status(200).json({
                    uuid: user.uuid,
                    token: jwt.sign(
                        {uuid: user.uuid},
                        'Opazlf11"é&&0_"??.zrfiofzhgo@PMld,fr', //clé d'encodage du token a mettre aléatoirement faut qu'elle soit très longue
                        {expiresIn: '12h'}
                    ), // installer npm install --save  jsonwebtoken pour créer les TOKEN puis les vérifier
                });       
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};
// FIN - LOGIN des users