let express = require('express');
let router = express.Router();

let commentCtrl = require('../controllers/comment');

router.post('/comment', commentCtrl.createComment);
router.put('/comment', commentCtrl.updateComment);
router.delete('/comment', commentCtrl.deleteComment);
// router.get est dans l'association avec les posts


module.exports = router;