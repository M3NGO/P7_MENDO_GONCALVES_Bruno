let express = require('express');
let router = express.Router();

let userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/profile/:uuid', userCtrl.profile) // pour livrer les infos du profil user

router.put('/profile/:uuid', userCtrl.update) // pour modifier les infos du profil user

router.get('/allusers', userCtrl.getallusers); // pour trouver tous les users

router.delete('/profile/:uuid', userCtrl.delete) // route pour delete user




module.exports = router;