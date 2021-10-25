let express = require('express');
let router = express.Router();

let postCtrl = require('../controllers/post');

router.post('/', postCtrl.createPost);
// router.put ('/:id', postCtrl.modifPost)




module.exports = router;