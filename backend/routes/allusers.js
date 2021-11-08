let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let allusersCtrl = require('../controllers/allusers');

router.get('/', allusersCtrl.getallusers); // pour trouver tous les users
router.get ('/notactive', allusersCtrl.allusersnotactive)
//ajouter auth,
module.exports = router;