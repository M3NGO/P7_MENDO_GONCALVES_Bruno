let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')//pour securiser les routes
let multer = require('../middleware/multer-comments');//pour l'enregistrement des fichiers du front dans le back
let commentCtrl = require('../controllers/comment');

router.post('/comment', auth, multer, commentCtrl.createComment);//ajouter auth, avant multer
router.get('/comment/:id',auth, multer, commentCtrl.getComment);
router.put('/comment/:id', auth, multer, commentCtrl.updateComment);
router.delete('/comment/:id', auth,multer, commentCtrl.deleteComment);

module.exports = router;