let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let multer = require('../middleware/multer-posts');

let postCtrl = require('../controllers/post');

router.post('/post', multer, postCtrl.createPost);// rajouter auth, avant multer
router.get('/',  postCtrl.getallPosts);
router.get ('/post/:id', multer, postCtrl.getPost);
router.put ('/post/:id',  multer, postCtrl.updatePost);
router.delete ('/post/:id',  multer, postCtrl.deletePost);


module.exports = router;