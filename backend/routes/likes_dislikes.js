let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let likesDislikesCtrl = require('../controllers/likes_dislikes');

router.post ('/post/:id/like', likesDislikesCtrl.postLikesDislikes);//ajouter auth, 
router.post ('/comment/:id/like',  likesDislikesCtrl.commentLikesDislikes);

module.exports = router;