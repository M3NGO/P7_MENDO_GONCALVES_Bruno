let express = require('express');
let router = express.Router();
let multerAvatar = require('../middleware/multer-avatar');
let auth = require('../middleware/auth')

let userCtrl = require('../controllers/user');
//ajouter auth, devant multer
router.get('/:uuid', auth, userCtrl.profile) // pour livrer les infos du profil user à : profile/:lastname.:firstname mais en ayant uuid dans la requete body

router.put('/:uuid/update', auth, multerAvatar, userCtrl.update) // pour modifier les infos du profil user

router.put('/:uuid/delete_avatar',auth, multerAvatar, userCtrl.deleteAvatar)

router.put('/:uuid/password', auth,userCtrl.updatePassword)

router.delete('/:uuid', auth, userCtrl.delete) // route pour delete user (mettre non actif)

module.exports = router;