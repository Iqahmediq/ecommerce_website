const router = require('express').Router();
const AuthController = require('../controller/AuthController.js');
const signupValidator = require('../middlewares/validator/signup.validator.js');
router.post('/login',AuthController.login);

router.post('/signUp',signupValidator,AuthController.signUp);
module.exports = router;