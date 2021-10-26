let express = require('express');
let router = express.Router();

let postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPost);
router.get('/', postCtrl.getallPosts);
router.get ('/:id', postCtrl.getPost);
router.put ('/:id', postCtrl.updatePost);
router.delete ('/:id', postCtrl.deletePost);


module.exports = router;