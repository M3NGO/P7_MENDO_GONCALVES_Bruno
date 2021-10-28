let express = require('express');
let router = express.Router();
let auth = require('../middleware/auth')
let allusersCtrl = require('../controllers/allusers');

router.get('/', auth, allusersCtrl.getallusers); // pour trouver tous les users

module.exports = router;