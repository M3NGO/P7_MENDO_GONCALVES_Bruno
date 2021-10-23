let express = require('express');
let router = express.Router();

let commentCtrl = require('../controllers/comment');

router.post('/comments', commentCtrl.getcomments);




module.exports = router;