const router = require('express').Router();
const AdminController = require('../controller/AdminController.js');
const UserController = require('../controller/UserController.js');
router.get('/article/:id',UserController.readArticleById);
router.get('/article/:offset/:limite',UserController.readArticle);
router.delete('/article/:id',AdminController.deleteById);
router.post('/signUp',AuthController.signUp);
module.exports = router;