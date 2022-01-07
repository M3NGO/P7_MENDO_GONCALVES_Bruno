let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')//pour sécuriser les routes
let multer = require('../middleware/multer-posts');//pourla gestion des enregistrements des fichieres dans le back venus du front
let postCtrl = require('../controllers/post');

router.post('/post',auth, multer, postCtrl.createPost);// rajouter auth, avant multer
router.get('/', auth, postCtrl.getallPosts);
router.get ('/post/:id',auth, multer, postCtrl.getPost);
router.put ('/post/:id', auth, multer, postCtrl.updatePost);
router.delete ('/post/:id', auth, multer, postCtrl.deletePost);

module.exports = router;