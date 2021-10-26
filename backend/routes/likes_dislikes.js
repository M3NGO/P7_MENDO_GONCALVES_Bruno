let express = require('express');
let router = express.Router();

let likesDislikesCtrl = require('../controllers/likes_dislikes');

router.post ('/:id/like', likesDislikesCtrl.postLikesDislikes);
router.post ('/:id/comment/like', likesDislikesCtrl.commentLikesDislikes);

module.exports = router;