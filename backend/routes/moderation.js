let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let moderationCtrl = require('../controllers/moderation');

router.put('/edit', moderationCtrl.moderationUser) // pour modifier les infos du profil user
router.put('/edit/post', moderationCtrl.moderationPost)
router.put('/edit/comment', moderationCtrl.moderationComment)
router.delete('/edit/delete/user/:uuid',  moderationCtrl.deleteUser)

module.exports = router;