// ne pas oublier de npm install --save multer
let multer = require('multer');
let {Post, User} = require('../models')

let MIME_TYPE = { // mimetype donne la définition des formats acceptés pour les fichiers téléchargés
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/gif': 'gif',
    'image/svg': 'svg',
    'video/mpeg': 'mpeg',
    'video/mp4': 'mp4',
    'video/avi': 'avi',
}
let imageFilter = async (req, file, callback) => {
    // console.log(req.body)
    let post_id = req.body.post_id;
    let fileSize = parseInt(req.headers['content-length']);
    
    await Post.findOne({ where: {id: post_id}})
    .then((commentUser) =>{
        // console.log(commentUser)
        if(!commentUser){
            return callback("Post non trouvé, fichier non enregistré")
        }
    if (file.mimetype.startsWith("image") && fileSize <= 1048576 ||file.mimetype.startsWith("video") && fileSize <= 20971520 ) { // taille maxi fichier environ 20Mb pour le video et 1Mb pour les photos
      callback(null, 'images'); //images static from app.js
    } else {
      callback("Veuillez uploader uniquement des images au format : jpg, png, gif inférieures à 1Mb ou des videos au format avi ou mpeg inférieures à 20Mb", false);
    }
    }).catch(error => res.status(400).json({error}));
}

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        let uuid = req.body.uuid;
        User.findOne({where:{ uuid}})
        .then((user) => {
            if(!user){
                return callback("utilisateur non trouvé, fichier non enregistré")
            }else{
                if(file.mimetype.startsWith("image")){
                    callback(null, '../uploads/'+ user.email+ '/images/comments')
                }if(file.mimetype.startsWith("video")){
                    callback(null, '../uploads/'+ user.email+ '/videos/comments')
                }
                console.log(user.email)
            }//fin else

        })//Fin then



    },
    filename : (req, file, callback) => {
        let name = file.originalname.split(' ').join('_') // dans le cas de fichiers només avec espace alors les espaces seront remplacés par des '_'
        let extension = MIME_TYPE[file.mimetype];
        callback(null, 'comment' + '_' + name + Date.now() + '.' + extension); //enregistre le fichier avec le nom + time stamp . extension
    },
});

module.exports = multer({storage, fileFilter:imageFilter}).single('upload');