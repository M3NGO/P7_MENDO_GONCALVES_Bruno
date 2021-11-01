let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let multer = require('../middleware/multer-comments');

let commentCtrl = require('../controllers/comment');

router.post('/comment',  multer, commentCtrl.createComment);//ajouter auth, avant multer
router.get('/comment/:id', multer, commentCtrl.getComment);
router.put('/comment/:id',  multer, commentCtrl.updateComment);
router.delete('/comment/:id', multer, commentCtrl.deleteComment);
// router.get est dans l'association avec les posts


module.exports = router;