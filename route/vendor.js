const router = require('express').Router();
const UserController = require('../controller/UserController.js');
router.get('/article/:id',UserController.readArticleById);
router.get('/article/:offset/:limite',UserController.readArticle);
router.delete('/article/:id',VendorController.deleteById);
router.post('/signUp',AuthController.signUp);
module.exports = router;