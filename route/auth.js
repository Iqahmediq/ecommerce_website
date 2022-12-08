const router = require('express').Router();
const AuthController = require('../controller/AuthController.js');
router.post('/login',AuthController.login);
router.post('/signUp',AuthController.signUp);
module.exports = router;