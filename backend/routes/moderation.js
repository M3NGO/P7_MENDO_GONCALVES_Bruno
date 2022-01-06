let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let moderationCtrl = require('../controllers/moderation');

router.get('/get/posts',auth, moderationCtrl.getModeratedPosts)
router.put('/edit/post', auth,moderationCtrl.moderationPost)
router.get('/get/comments',auth, moderationCtrl.getModeratedComments)
router.put('/edit/comment',auth, moderationCtrl.moderationComment)
router.put('/edit/user', auth,moderationCtrl.moderationUser) // pour modifier les infos du profil user
router.get ('/get/users/deleted',auth, moderationCtrl.getAllUsersDeleted) //Users sui se suppriment d'eux mêmes (seuls les modérateurs peuvent définitivement supprimer leur contenu)
router.get('/get/users',auth, moderationCtrl.getModeratedUsers)//Users qui son en statut à modérer( peuvent redevenir users actifs via moderateur)
router.delete('/edit/user/delete/:uuid',auth,  moderationCtrl.deleteUser) //delete definitivement le user et tout son contenu

module.exports = router;