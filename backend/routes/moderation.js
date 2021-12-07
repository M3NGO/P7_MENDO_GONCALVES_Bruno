let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let moderationCtrl = require('../controllers/moderation');

router.get('/get/posts', moderationCtrl.getModeratedPosts)
router.put('/edit/post', moderationCtrl.moderationPost)
router.get('/get/comments', moderationCtrl.getModeratedComments)
router.put('/edit/comment', moderationCtrl.moderationComment)
router.put('/edit/user', moderationCtrl.moderationUser) // pour modifier les infos du profil user
router.get ('/get/users/deleted', moderationCtrl.getAllUsersDeleted) //Users sui se suppriment d'eux mêmes (seuls les modérateurs peuvent définitivement supprimer leur contenu)
router.get('/get/users', moderationCtrl.getModeratedUsers)//Users qui son en statut à modérer( peuvent redevenir users actifs via moderateur)
router.delete('/edit/user/delete/:uuid',  moderationCtrl.deleteUser)

module.exports = router;