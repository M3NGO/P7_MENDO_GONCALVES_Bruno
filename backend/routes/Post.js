let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let multer = require('../middleware/multer-posts');

let postCtrl = require('../controllers/post');

router.post('/', auth, multer, postCtrl.createPost);
router.get('/', auth, postCtrl.getallPosts);
router.get ('/:id', auth, multer, postCtrl.getPost);
router.put ('/:id', auth, multer, postCtrl.updatePost);
router.delete ('/:id', auth, multer, postCtrl.deletePost);


module.exports = router;