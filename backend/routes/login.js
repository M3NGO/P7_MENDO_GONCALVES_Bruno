let express = require('express');
let router = express.Router();

let loginCtrl = require('../controllers/login');

router.post('/signup', loginCtrl.signup);

router.post('/login', loginCtrl.login);

module.exports = router;