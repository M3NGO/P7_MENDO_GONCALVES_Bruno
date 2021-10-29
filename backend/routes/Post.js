let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let multer = require('../middleware/multer-posts');

let postCtrl = require('../controllers/post');

router.post('/post', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getallPosts);
router.get ('/post/:id', auth, multer, postCtrl.getPost);
router.put ('/post/:id', auth, multer, postCtrl.updatePost);
router.delete ('/post/:id', auth, multer, postCtrl.deletePost);


module.exports = router;