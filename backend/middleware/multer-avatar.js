// ne pas oublier de npm install --save multer
let multer = require('multer');

let MIME_TYPE = { // mimetype donne la définition des formats acceptés pour les fichiers téléchargés
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
    'image/svg': 'svg',
}

let imageFilter = (req, file, callback) => {
    let fileSize = parseInt(req.headers['content-length']);
    if (file.mimetype.startsWith("image") && fileSize <= 1048576) { // taille maxi fichier environ 1Mb pour les photos
      callback(null, 'avatars'); //images static from app.js
    } else {
      callback("Veuillez uploader uniquement des avatars d'une taille inférieure à 1Mo au format : jpg, png", false);
    }
}

let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        if(file.mimetype.startsWith("image")){
            callback(null, '../uploads/avatars')
        }
    },
    filename : (req, file, callback) => {
        let name = file.originalname.split(' ').join('_') // dans le cas de fichiers només avec espace alors les espaces seront remplacés par des '_'
        let extension = MIME_TYPE[file.mimetype];
        callback(null, 'avatar' + '_' + name + Date.now() + '.' + extension); //enregistre le fichier avec le nom + time stamp . extension
    },

});

module.exports = multer({storage, fileFilter:imageFilter}).single('upload');