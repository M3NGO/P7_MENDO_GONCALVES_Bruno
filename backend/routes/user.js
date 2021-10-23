let express = require('express');
let router = express.Router();

let userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/profile/:id', userCtrl.profile) // pour livrer les infos du profil user

router.get('/allusers', userCtrl.getallusers); // pour trouver tous les users




module.exports = router;