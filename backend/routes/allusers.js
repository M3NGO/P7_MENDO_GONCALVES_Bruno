let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let allusersCtrl = require('../controllers/allusers');

router.get('/',auth, allusersCtrl.getallusers); // pour trouver tous les users

//ajouter auth pour securiser la route
module.exports = router;