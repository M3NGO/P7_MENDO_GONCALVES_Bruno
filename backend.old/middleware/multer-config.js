// ne pas oublier de npm install --save multer
let multer = require('multer');

let MIME_TYPE = { // mimetype donne la définition des formats acceptés pour les fichiers téléchargés
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/jpg': 'jpg',
}

// let storage donne le format du fichier
let storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'images') //destination d'enregistrement et localisation des images
    },
    filename : (req, file, callback) => {
        let name = file.originalname.split(' ').join('_') // dans le cas de fichiers només avec espace alors les espaces seront remplacés par des '_'
        let extension = MIME_TYPE[file.mimetype];
        callback(null, name + Date.now() + '.' + extension); //enregistre le fichier avec le nom + time stamp . extension
    }
});

module.exports = multer({storage}).single('image');