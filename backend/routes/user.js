let express = require('express');
let router = express.Router();
let multerAvatar = require('../middleware/multer-avatar');

let userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/:firstname.:lastname', userCtrl.profile) // pour livrer les infos du profil user à : profile/:lastname.:firstname mais en ayant uuid dans la requete body

router.put('/:uuid', multerAvatar, userCtrl.update) // pour modifier les infos du profil user

router.get('/allusers', userCtrl.getallusers); // pour trouver tous les users

router.delete('/:firstname.:lastname', userCtrl.delete) // route pour delete user





module.exports = router;