// ne pas oublier de npm install --save multer
let multer = require('multer');
let {User}= require('../models')

let MIME_TYPE = { // mimetype donne la définition des formats acceptés pour les fichiers téléchargés
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/svg': 'svg',
}

let imageFilter = async (req, file, callback) => {
    let uuid = req.params.uuid;
    let fileSize = parseInt(req.headers['content-length']);

    await User.findOne({where:{ uuid}})
    .then((user) =>{
        if(!user){
            return callback("utilisateur non trouvé, fichier non enregistré")
        }
    if (file.mimetype.startsWith("image") && fileSize <= 1048576) { // taille maxi fichier environ 1Mb pour les photos
      callback(null, 'avatars'); //images static from app.js
    } else {
      callback("Veuillez uploader uniquement des avatars d'une taille inférieure à 1Mo au format : jpg, png", false);
    }
}).catch(error => res.status(400).json({error}));
}//FIN imageFilter pour filtrer le type de fichier reçu et la taille maximale de fichier

let storage = multer.diskStorage({
    //definit la destination d'enregistrement des fichiers
    destination: (req, file, callback) => {
        let uuid = req.params.uuid;
        User.findOne({where:{ uuid}})
        .then((user) => {
            if(!user){
                return callback("utilisateur non trouvé, fichier non enregistré")
            }else{
                if(file.mimetype.startsWith("image")){
                    callback(null, './uploads/'+user.uuid+'/avatar')
                }
                // console.log(user.email)
            }//fin else
        })//Fin then
    },//FIN DESTINATION
    //filename pour renomer les fichiers reçus en y intégrant la date de reception et avatar pour différencier d'un autre type d'image
    filename : (req, file, callback) => {
        let name = file.originalname.split(' ').join('_') // dans le cas de fichiers només avec espace alors les espaces seront remplacés par des '_'
        let extension = MIME_TYPE[file.mimetype];
        callback(null, 'avatar' + '_' + name + Date.now() + '.' + extension); //enregistre le fichier avec le nom + time stamp . extension
    },//FIN filename

});//FIN STORAGE

module.exports = multer({storage, fileFilter:imageFilter}).single('upload');