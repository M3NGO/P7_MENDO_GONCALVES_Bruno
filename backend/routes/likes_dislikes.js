let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')

let likesDislikesCtrl = require('../controllers/likes_dislikes');

router.post ('/post/:id/like', auth,likesDislikesCtrl.postLikesDislikes);//ajouter auth, 
router.post ('/comment/:id/like', auth, likesDislikesCtrl.commentLikesDislikes);
router.get ('/get/comment/likesdislikes', auth,likesDislikesCtrl.getCommentLikesDislikes);
router.get ('/get/post/likesdislikes', auth,likesDislikesCtrl.getPostLikesDislikes)

module.exports = router;