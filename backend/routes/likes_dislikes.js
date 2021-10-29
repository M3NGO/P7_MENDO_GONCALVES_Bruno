let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let likesDislikesCtrl = require('../controllers/likes_dislikes');

router.post ('/post/:id/like', auth, likesDislikesCtrl.postLikesDislikes);
router.post ('/comment/:id/like', auth, likesDislikesCtrl.commentLikesDislikes);

module.exports = router;