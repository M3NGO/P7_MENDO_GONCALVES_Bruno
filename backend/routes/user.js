let express = require('express');
let router = express.Router();

let userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);

router.post('/login', userCtrl.login);

router.get('/usersall', userCtrl.getall);




module.exports = router;