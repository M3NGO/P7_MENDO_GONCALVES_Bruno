let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let moderationCtrl = require('../controllers/moderation');

router.put('/:uuid/edit', moderationCtrl.moderationUser) // pour modifier les infos du profil user
router.put('/:uuid/edit/post', moderationCtrl.moderationPost)
router.put('/:uuid/edit/comment', moderationCtrl.moderationComment)
router.delete('/:uuid/edit/delete',  moderationCtrl.deleteUser)

module.exports = router;